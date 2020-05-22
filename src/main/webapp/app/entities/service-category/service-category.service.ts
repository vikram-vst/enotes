import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServiceCategory } from 'app/shared/model/service-category.model';

type EntityResponseType = HttpResponse<IServiceCategory>;
type EntityArrayResponseType = HttpResponse<IServiceCategory[]>;

@Injectable({ providedIn: 'root' })
export class ServiceCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/service-categories';

  constructor(protected http: HttpClient) {}

  create(serviceCategory: IServiceCategory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceCategory);
    return this.http
      .post<IServiceCategory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(serviceCategory: IServiceCategory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceCategory);
    return this.http
      .put<IServiceCategory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IServiceCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IServiceCategory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(serviceCategory: IServiceCategory): IServiceCategory {
    const copy: IServiceCategory = Object.assign({}, serviceCategory, {
      createdDate: serviceCategory.createdDate && serviceCategory.createdDate.isValid() ? serviceCategory.createdDate.toJSON() : undefined,
      lastModifiedDate:
        serviceCategory.lastModifiedDate && serviceCategory.lastModifiedDate.isValid()
          ? serviceCategory.lastModifiedDate.toJSON()
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
      res.body.forEach((serviceCategory: IServiceCategory) => {
        serviceCategory.createdDate = serviceCategory.createdDate ? moment(serviceCategory.createdDate) : undefined;
        serviceCategory.lastModifiedDate = serviceCategory.lastModifiedDate ? moment(serviceCategory.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
