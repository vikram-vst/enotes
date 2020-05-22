import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServiceFacility } from 'app/shared/model/service-facility.model';

type EntityResponseType = HttpResponse<IServiceFacility>;
type EntityArrayResponseType = HttpResponse<IServiceFacility[]>;

@Injectable({ providedIn: 'root' })
export class ServiceFacilityService {
  public resourceUrl = SERVER_API_URL + 'api/service-facilities';

  constructor(protected http: HttpClient) {}

  create(serviceFacility: IServiceFacility): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceFacility);
    return this.http
      .post<IServiceFacility>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(serviceFacility: IServiceFacility): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(serviceFacility);
    return this.http
      .put<IServiceFacility>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IServiceFacility>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IServiceFacility[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(serviceFacility: IServiceFacility): IServiceFacility {
    const copy: IServiceFacility = Object.assign({}, serviceFacility, {
      fromDate: serviceFacility.fromDate && serviceFacility.fromDate.isValid() ? serviceFacility.fromDate.toJSON() : undefined,
      thruDate: serviceFacility.thruDate && serviceFacility.thruDate.isValid() ? serviceFacility.thruDate.toJSON() : undefined,
      startDate: serviceFacility.startDate && serviceFacility.startDate.isValid() ? serviceFacility.startDate.toJSON() : undefined,
      endDate: serviceFacility.endDate && serviceFacility.endDate.isValid() ? serviceFacility.endDate.toJSON() : undefined,
      createdDate: serviceFacility.createdDate && serviceFacility.createdDate.isValid() ? serviceFacility.createdDate.toJSON() : undefined,
      lastModifiedDate:
        serviceFacility.lastModifiedDate && serviceFacility.lastModifiedDate.isValid()
          ? serviceFacility.lastModifiedDate.toJSON()
          : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fromDate = res.body.fromDate ? moment(res.body.fromDate) : undefined;
      res.body.thruDate = res.body.thruDate ? moment(res.body.thruDate) : undefined;
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((serviceFacility: IServiceFacility) => {
        serviceFacility.fromDate = serviceFacility.fromDate ? moment(serviceFacility.fromDate) : undefined;
        serviceFacility.thruDate = serviceFacility.thruDate ? moment(serviceFacility.thruDate) : undefined;
        serviceFacility.startDate = serviceFacility.startDate ? moment(serviceFacility.startDate) : undefined;
        serviceFacility.endDate = serviceFacility.endDate ? moment(serviceFacility.endDate) : undefined;
        serviceFacility.createdDate = serviceFacility.createdDate ? moment(serviceFacility.createdDate) : undefined;
        serviceFacility.lastModifiedDate = serviceFacility.lastModifiedDate ? moment(serviceFacility.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
