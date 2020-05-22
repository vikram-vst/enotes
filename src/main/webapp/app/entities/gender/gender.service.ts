import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGender } from 'app/shared/model/gender.model';

type EntityResponseType = HttpResponse<IGender>;
type EntityArrayResponseType = HttpResponse<IGender[]>;

@Injectable({ providedIn: 'root' })
export class GenderService {
  public resourceUrl = SERVER_API_URL + 'api/genders';

  constructor(protected http: HttpClient) {}

  create(gender: IGender): Observable<EntityResponseType> {
    return this.http.post<IGender>(this.resourceUrl, gender, { observe: 'response' });
  }

  update(gender: IGender): Observable<EntityResponseType> {
    return this.http.put<IGender>(this.resourceUrl, gender, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGender>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGender[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
