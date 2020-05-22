import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFacilityGroup } from 'app/shared/model/facility-group.model';

type EntityResponseType = HttpResponse<IFacilityGroup>;
type EntityArrayResponseType = HttpResponse<IFacilityGroup[]>;

@Injectable({ providedIn: 'root' })
export class FacilityGroupService {
  public resourceUrl = SERVER_API_URL + 'api/facility-groups';

  constructor(protected http: HttpClient) {}

  create(facilityGroup: IFacilityGroup): Observable<EntityResponseType> {
    return this.http.post<IFacilityGroup>(this.resourceUrl, facilityGroup, { observe: 'response' });
  }

  update(facilityGroup: IFacilityGroup): Observable<EntityResponseType> {
    return this.http.put<IFacilityGroup>(this.resourceUrl, facilityGroup, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFacilityGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFacilityGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
