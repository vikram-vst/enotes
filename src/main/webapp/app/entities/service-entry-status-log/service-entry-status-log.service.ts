import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServiceEntryStatusLog } from 'app/shared/model/service-entry-status-log.model';

type EntityResponseType = HttpResponse<IServiceEntryStatusLog>;
type EntityArrayResponseType = HttpResponse<IServiceEntryStatusLog[]>;

@Injectable({ providedIn: 'root' })
export class ServiceEntryStatusLogService {
  public resourceUrl = SERVER_API_URL + 'api/service-entry-status-logs';

  constructor(protected http: HttpClient) {}

  create(serviceEntryStatusLog: IServiceEntryStatusLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceEntryStatusLog);
    return this.http
      .post<IServiceEntryStatusLog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(serviceEntryStatusLog: IServiceEntryStatusLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceEntryStatusLog);
    return this.http
      .put<IServiceEntryStatusLog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IServiceEntryStatusLog>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IServiceEntryStatusLog[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(serviceEntryStatusLog: IServiceEntryStatusLog): IServiceEntryStatusLog {
    const copy: IServiceEntryStatusLog = Object.assign({}, serviceEntryStatusLog, {
      createdDate:
        serviceEntryStatusLog.createdDate && serviceEntryStatusLog.createdDate.isValid()
          ? serviceEntryStatusLog.createdDate.toJSON()
          : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((serviceEntryStatusLog: IServiceEntryStatusLog) => {
        serviceEntryStatusLog.createdDate = serviceEntryStatusLog.createdDate ? moment(serviceEntryStatusLog.createdDate) : undefined;
      });
    }
    return res;
  }
}
