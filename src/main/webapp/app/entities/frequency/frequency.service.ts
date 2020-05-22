import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFrequency } from 'app/shared/model/frequency.model';

type EntityResponseType = HttpResponse<IFrequency>;
type EntityArrayResponseType = HttpResponse<IFrequency[]>;

@Injectable({ providedIn: 'root' })
export class FrequencyService {
  public resourceUrl = SERVER_API_URL + 'api/frequencies';

  constructor(protected http: HttpClient) {}

  create(frequency: IFrequency): Observable<EntityResponseType> {
    return this.http.post<IFrequency>(this.resourceUrl, frequency, { observe: 'response' });
  }

  update(frequency: IFrequency): Observable<EntityResponseType> {
    return this.http.put<IFrequency>(this.resourceUrl, frequency, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFrequency>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFrequency[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
