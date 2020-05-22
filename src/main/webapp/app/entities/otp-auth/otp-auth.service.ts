import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOtpAuth } from 'app/shared/model/otp-auth.model';

type EntityResponseType = HttpResponse<IOtpAuth>;
type EntityArrayResponseType = HttpResponse<IOtpAuth[]>;

@Injectable({ providedIn: 'root' })
export class OtpAuthService {
  public resourceUrl = SERVER_API_URL + 'api/otp-auths';

  constructor(protected http: HttpClient) {}

  create(otpAuth: IOtpAuth): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(otpAuth);
    return this.http
      .post<IOtpAuth>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(otpAuth: IOtpAuth): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(otpAuth);
    return this.http
      .put<IOtpAuth>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOtpAuth>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOtpAuth[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(otpAuth: IOtpAuth): IOtpAuth {
    const copy: IOtpAuth = Object.assign({}, otpAuth, {
      otpSentTime: otpAuth.otpSentTime && otpAuth.otpSentTime.isValid() ? otpAuth.otpSentTime.toJSON() : undefined,
      createdDate: otpAuth.createdDate && otpAuth.createdDate.isValid() ? otpAuth.createdDate.toJSON() : undefined,
      lastModifiedDate: otpAuth.lastModifiedDate && otpAuth.lastModifiedDate.isValid() ? otpAuth.lastModifiedDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.otpSentTime = res.body.otpSentTime ? moment(res.body.otpSentTime) : undefined;
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((otpAuth: IOtpAuth) => {
        otpAuth.otpSentTime = otpAuth.otpSentTime ? moment(otpAuth.otpSentTime) : undefined;
        otpAuth.createdDate = otpAuth.createdDate ? moment(otpAuth.createdDate) : undefined;
        otpAuth.lastModifiedDate = otpAuth.lastModifiedDate ? moment(otpAuth.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
