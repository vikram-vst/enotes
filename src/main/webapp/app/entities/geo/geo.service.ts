import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGeo } from 'app/shared/model/geo.model';

type EntityResponseType = HttpResponse<IGeo>;
type EntityArrayResponseType = HttpResponse<IGeo[]>;

@Injectable({ providedIn: 'root' })
export class GeoService {
  public resourceUrl = SERVER_API_URL + 'api/geos';

  constructor(protected http: HttpClient) {}

  create(geo: IGeo): Observable<EntityResponseType> {
    return this.http.post<IGeo>(this.resourceUrl, geo, { observe: 'response' });
  }

  update(geo: IGeo): Observable<EntityResponseType> {
    return this.http.put<IGeo>(this.resourceUrl, geo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGeo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGeo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
