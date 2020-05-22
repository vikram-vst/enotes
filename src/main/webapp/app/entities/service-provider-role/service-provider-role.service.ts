import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServiceProviderRole } from 'app/shared/model/service-provider-role.model';

type EntityResponseType = HttpResponse<IServiceProviderRole>;
type EntityArrayResponseType = HttpResponse<IServiceProviderRole[]>;

@Injectable({ providedIn: 'root' })
export class ServiceProviderRoleService {
  public resourceUrl = SERVER_API_URL + 'api/service-provider-roles';

  constructor(protected http: HttpClient) {}

  create(serviceProviderRole: IServiceProviderRole): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceProviderRole);
    return this.http
      .post<IServiceProviderRole>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(serviceProviderRole: IServiceProviderRole): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceProviderRole);
    return this.http
      .put<IServiceProviderRole>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IServiceProviderRole>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IServiceProviderRole[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(serviceProviderRole: IServiceProviderRole): IServiceProviderRole {
    const copy: IServiceProviderRole = Object.assign({}, serviceProviderRole, {
      createdDate:
        serviceProviderRole.createdDate && serviceProviderRole.createdDate.isValid() ? serviceProviderRole.createdDate.toJSON() : undefined,
      lastModifiedDate:
        serviceProviderRole.lastModifiedDate && serviceProviderRole.lastModifiedDate.isValid()
          ? serviceProviderRole.lastModifiedDate.toJSON()
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
      res.body.forEach((serviceProviderRole: IServiceProviderRole) => {
        serviceProviderRole.createdDate = serviceProviderRole.createdDate ? moment(serviceProviderRole.createdDate) : undefined;
        serviceProviderRole.lastModifiedDate = serviceProviderRole.lastModifiedDate
          ? moment(serviceProviderRole.lastModifiedDate)
          : undefined;
      });
    }
    return res;
  }
}
