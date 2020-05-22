import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGeoType } from 'app/shared/model/geo-type.model';

type EntityResponseType = HttpResponse<IGeoType>;
type EntityArrayResponseType = HttpResponse<IGeoType[]>;

@Injectable({ providedIn: 'root' })
export class GeoTypeService {
  public resourceUrl = SERVER_API_URL + 'api/geo-types';

  constructor(protected http: HttpClient) {}

  create(geoType: IGeoType): Observable<EntityResponseType> {
    return this.http.post<IGeoType>(this.resourceUrl, geoType, { observe: 'response' });
  }

  update(geoType: IGeoType): Observable<EntityResponseType> {
    return this.http.put<IGeoType>(this.resourceUrl, geoType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGeoType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGeoType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
