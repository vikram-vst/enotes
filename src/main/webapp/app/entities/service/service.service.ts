import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IService } from 'app/shared/model/service.model';

type EntityResponseType = HttpResponse<IService>;
type EntityArrayResponseType = HttpResponse<IService[]>;

@Injectable({ providedIn: 'root' })
export class ServiceService {
  public resourceUrl = SERVER_API_URL + 'api/services';

  constructor(protected http: HttpClient) {}

  create(service: IService): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(service);
    return this.http
      .post<IService>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(service: IService): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(service);
    return this.http
      .put<IService>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IService>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IService[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(service: IService): IService {
    const copy: IService = Object.assign({}, service, {
      startDate: service.startDate && service.startDate.isValid() ? service.startDate.toJSON() : undefined,
      endDate: service.endDate && service.endDate.isValid() ? service.endDate.toJSON() : undefined,
      createdDate: service.createdDate && service.createdDate.isValid() ? service.createdDate.toJSON() : undefined,
      lastModifiedDate: service.lastModifiedDate && service.lastModifiedDate.isValid() ? service.lastModifiedDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((service: IService) => {
        service.startDate = service.startDate ? moment(service.startDate) : undefined;
        service.endDate = service.endDate ? moment(service.endDate) : undefined;
        service.createdDate = service.createdDate ? moment(service.createdDate) : undefined;
        service.lastModifiedDate = service.lastModifiedDate ? moment(service.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
