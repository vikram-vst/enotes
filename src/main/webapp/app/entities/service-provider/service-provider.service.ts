import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServiceProvider } from 'app/shared/model/service-provider.model';

type EntityResponseType = HttpResponse<IServiceProvider>;
type EntityArrayResponseType = HttpResponse<IServiceProvider[]>;

@Injectable({ providedIn: 'root' })
export class ServiceProviderService {
  public resourceUrl = SERVER_API_URL + 'api/service-providers';

  constructor(protected http: HttpClient) {}

  create(serviceProvider: IServiceProvider): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceProvider);
    return this.http
      .post<IServiceProvider>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(serviceProvider: IServiceProvider): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceProvider);
    return this.http
      .put<IServiceProvider>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IServiceProvider>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IServiceProvider[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(serviceProvider: IServiceProvider): IServiceProvider {
    const copy: IServiceProvider = Object.assign({}, serviceProvider, {
      fromDate: serviceProvider.fromDate && serviceProvider.fromDate.isValid() ? serviceProvider.fromDate.toJSON() : undefined,
      thruDate: serviceProvider.thruDate && serviceProvider.thruDate.isValid() ? serviceProvider.thruDate.toJSON() : undefined,
      createdDate: serviceProvider.createdDate && serviceProvider.createdDate.isValid() ? serviceProvider.createdDate.toJSON() : undefined,
      lastModifiedDate:
        serviceProvider.lastModifiedDate && serviceProvider.lastModifiedDate.isValid()
          ? serviceProvider.lastModifiedDate.toJSON()
          : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fromDate = res.body.fromDate ? moment(res.body.fromDate) : undefined;
      res.body.thruDate = res.body.thruDate ? moment(res.body.thruDate) : undefined;
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((serviceProvider: IServiceProvider) => {
        serviceProvider.fromDate = serviceProvider.fromDate ? moment(serviceProvider.fromDate) : undefined;
        serviceProvider.thruDate = serviceProvider.thruDate ? moment(serviceProvider.thruDate) : undefined;
        serviceProvider.createdDate = serviceProvider.createdDate ? moment(serviceProvider.createdDate) : undefined;
        serviceProvider.lastModifiedDate = serviceProvider.lastModifiedDate ? moment(serviceProvider.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
