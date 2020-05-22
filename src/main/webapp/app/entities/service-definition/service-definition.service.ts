import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServiceDefinition } from 'app/shared/model/service-definition.model';

type EntityResponseType = HttpResponse<IServiceDefinition>;
type EntityArrayResponseType = HttpResponse<IServiceDefinition[]>;

@Injectable({ providedIn: 'root' })
export class ServiceDefinitionService {
  public resourceUrl = SERVER_API_URL + 'api/service-definitions';

  constructor(protected http: HttpClient) {}

  create(serviceDefinition: IServiceDefinition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceDefinition);
    return this.http
      .post<IServiceDefinition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(serviceDefinition: IServiceDefinition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceDefinition);
    return this.http
      .put<IServiceDefinition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IServiceDefinition>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IServiceDefinition[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(serviceDefinition: IServiceDefinition): IServiceDefinition {
    const copy: IServiceDefinition = Object.assign({}, serviceDefinition, {
      createdDate:
        serviceDefinition.createdDate && serviceDefinition.createdDate.isValid() ? serviceDefinition.createdDate.toJSON() : undefined,
      lastModifiedDate:
        serviceDefinition.lastModifiedDate && serviceDefinition.lastModifiedDate.isValid()
          ? serviceDefinition.lastModifiedDate.toJSON()
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
      res.body.forEach((serviceDefinition: IServiceDefinition) => {
        serviceDefinition.createdDate = serviceDefinition.createdDate ? moment(serviceDefinition.createdDate) : undefined;
        serviceDefinition.lastModifiedDate = serviceDefinition.lastModifiedDate ? moment(serviceDefinition.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
