import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServiceEntry } from 'app/shared/model/service-entry.model';

type EntityResponseType = HttpResponse<IServiceEntry>;
type EntityArrayResponseType = HttpResponse<IServiceEntry[]>;

@Injectable({ providedIn: 'root' })
export class ServiceEntryService {
  public resourceUrl = SERVER_API_URL + 'api/service-entries';

  constructor(protected http: HttpClient) {}

  create(serviceEntry: IServiceEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceEntry);
    return this.http
      .post<IServiceEntry>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(serviceEntry: IServiceEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceEntry);
    return this.http
      .put<IServiceEntry>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IServiceEntry>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IServiceEntry[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(serviceEntry: IServiceEntry): IServiceEntry {
    const copy: IServiceEntry = Object.assign({}, serviceEntry, {
      createdDate: serviceEntry.createdDate && serviceEntry.createdDate.isValid() ? serviceEntry.createdDate.toJSON() : undefined,
      initiatedDate: serviceEntry.initiatedDate && serviceEntry.initiatedDate.isValid() ? serviceEntry.initiatedDate.toJSON() : undefined,
      lastModifiedDate:
        serviceEntry.lastModifiedDate && serviceEntry.lastModifiedDate.isValid() ? serviceEntry.lastModifiedDate.toJSON() : undefined,
      serviceStartDate:
        serviceEntry.serviceStartDate && serviceEntry.serviceStartDate.isValid() ? serviceEntry.serviceStartDate.toJSON() : undefined,
      serviceEndDate:
        serviceEntry.serviceEndDate && serviceEntry.serviceEndDate.isValid() ? serviceEntry.serviceEndDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.initiatedDate = res.body.initiatedDate ? moment(res.body.initiatedDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
      res.body.serviceStartDate = res.body.serviceStartDate ? moment(res.body.serviceStartDate) : undefined;
      res.body.serviceEndDate = res.body.serviceEndDate ? moment(res.body.serviceEndDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((serviceEntry: IServiceEntry) => {
        serviceEntry.createdDate = serviceEntry.createdDate ? moment(serviceEntry.createdDate) : undefined;
        serviceEntry.initiatedDate = serviceEntry.initiatedDate ? moment(serviceEntry.initiatedDate) : undefined;
        serviceEntry.lastModifiedDate = serviceEntry.lastModifiedDate ? moment(serviceEntry.lastModifiedDate) : undefined;
        serviceEntry.serviceStartDate = serviceEntry.serviceStartDate ? moment(serviceEntry.serviceStartDate) : undefined;
        serviceEntry.serviceEndDate = serviceEntry.serviceEndDate ? moment(serviceEntry.serviceEndDate) : undefined;
      });
    }
    return res;
  }
}
