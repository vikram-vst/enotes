import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFacilityGroupType } from 'app/shared/model/facility-group-type.model';

type EntityResponseType = HttpResponse<IFacilityGroupType>;
type EntityArrayResponseType = HttpResponse<IFacilityGroupType[]>;

@Injectable({ providedIn: 'root' })
export class FacilityGroupTypeService {
  public resourceUrl = SERVER_API_URL + 'api/facility-group-types';

  constructor(protected http: HttpClient) {}

  create(facilityGroupType: IFacilityGroupType): Observable<EntityResponseType> {
    return this.http.post<IFacilityGroupType>(this.resourceUrl, facilityGroupType, { observe: 'response' });
  }

  update(facilityGroupType: IFacilityGroupType): Observable<EntityResponseType> {
    return this.http.put<IFacilityGroupType>(this.resourceUrl, facilityGroupType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFacilityGroupType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFacilityGroupType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
