import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPreferenceType } from 'app/shared/model/preference-type.model';

type EntityResponseType = HttpResponse<IPreferenceType>;
type EntityArrayResponseType = HttpResponse<IPreferenceType[]>;

@Injectable({ providedIn: 'root' })
export class PreferenceTypeService {
  public resourceUrl = SERVER_API_URL + 'api/preference-types';

  constructor(protected http: HttpClient) {}

  create(preferenceType: IPreferenceType): Observable<EntityResponseType> {
    return this.http.post<IPreferenceType>(this.resourceUrl, preferenceType, { observe: 'response' });
  }

  update(preferenceType: IPreferenceType): Observable<EntityResponseType> {
    return this.http.put<IPreferenceType>(this.resourceUrl, preferenceType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPreferenceType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPreferenceType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
