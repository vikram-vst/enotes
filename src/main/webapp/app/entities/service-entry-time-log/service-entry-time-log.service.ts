import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServiceEntryTimeLog } from 'app/shared/model/service-entry-time-log.model';

type EntityResponseType = HttpResponse<IServiceEntryTimeLog>;
type EntityArrayResponseType = HttpResponse<IServiceEntryTimeLog[]>;

@Injectable({ providedIn: 'root' })
export class ServiceEntryTimeLogService {
  public resourceUrl = SERVER_API_URL + 'api/service-entry-time-logs';

  constructor(protected http: HttpClient) {}

  create(serviceEntryTimeLog: IServiceEntryTimeLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceEntryTimeLog);
    return this.http
      .post<IServiceEntryTimeLog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(serviceEntryTimeLog: IServiceEntryTimeLog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceEntryTimeLog);
    return this.http
      .put<IServiceEntryTimeLog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IServiceEntryTimeLog>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IServiceEntryTimeLog[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(serviceEntryTimeLog: IServiceEntryTimeLog): IServiceEntryTimeLog {
    const copy: IServiceEntryTimeLog = Object.assign({}, serviceEntryTimeLog, {
      createdDate:
        serviceEntryTimeLog.createdDate && serviceEntryTimeLog.createdDate.isValid() ? serviceEntryTimeLog.createdDate.toJSON() : undefined,
      lastModifiedDate:
        serviceEntryTimeLog.lastModifiedDate && serviceEntryTimeLog.lastModifiedDate.isValid()
          ? serviceEntryTimeLog.lastModifiedDate.toJSON()
          : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((serviceEntryTimeLog: IServiceEntryTimeLog) => {
        serviceEntryTimeLog.createdDate = serviceEntryTimeLog.createdDate ? moment(serviceEntryTimeLog.createdDate) : undefined;
        serviceEntryTimeLog.lastModifiedDate = serviceEntryTimeLog.lastModifiedDate
          ? moment(serviceEntryTimeLog.lastModifiedDate)
          : undefined;
      });
    }
    return res;
  }
}
