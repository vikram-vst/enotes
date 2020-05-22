import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGeoAssocType } from 'app/shared/model/geo-assoc-type.model';

type EntityResponseType = HttpResponse<IGeoAssocType>;
type EntityArrayResponseType = HttpResponse<IGeoAssocType[]>;

@Injectable({ providedIn: 'root' })
export class GeoAssocTypeService {
  public resourceUrl = SERVER_API_URL + 'api/geo-assoc-types';

  constructor(protected http: HttpClient) {}

  create(geoAssocType: IGeoAssocType): Observable<EntityResponseType> {
    return this.http.post<IGeoAssocType>(this.resourceUrl, geoAssocType, { observe: 'response' });
  }

  update(geoAssocType: IGeoAssocType): Observable<EntityResponseType> {
    return this.http.put<IGeoAssocType>(this.resourceUrl, geoAssocType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGeoAssocType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGeoAssocType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
