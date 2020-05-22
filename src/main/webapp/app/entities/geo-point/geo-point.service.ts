import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGeoPoint } from 'app/shared/model/geo-point.model';

type EntityResponseType = HttpResponse<IGeoPoint>;
type EntityArrayResponseType = HttpResponse<IGeoPoint[]>;

@Injectable({ providedIn: 'root' })
export class GeoPointService {
  public resourceUrl = SERVER_API_URL + 'api/geo-points';

  constructor(protected http: HttpClient) {}

  create(geoPoint: IGeoPoint): Observable<EntityResponseType> {
    return this.http.post<IGeoPoint>(this.resourceUrl, geoPoint, { observe: 'response' });
  }

  update(geoPoint: IGeoPoint): Observable<EntityResponseType> {
    return this.http.put<IGeoPoint>(this.resourceUrl, geoPoint, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGeoPoint>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGeoPoint[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
