import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFacilityType } from 'app/shared/model/facility-type.model';

type EntityResponseType = HttpResponse<IFacilityType>;
type EntityArrayResponseType = HttpResponse<IFacilityType[]>;

@Injectable({ providedIn: 'root' })
export class FacilityTypeService {
  public resourceUrl = SERVER_API_URL + 'api/facility-types';

  constructor(protected http: HttpClient) {}

  create(facilityType: IFacilityType): Observable<EntityResponseType> {
    return this.http.post<IFacilityType>(this.resourceUrl, facilityType, { observe: 'response' });
  }

  update(facilityType: IFacilityType): Observable<EntityResponseType> {
    return this.http.put<IFacilityType>(this.resourceUrl, facilityType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFacilityType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFacilityType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
