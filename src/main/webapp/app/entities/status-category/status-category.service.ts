import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStatusCategory } from 'app/shared/model/status-category.model';

type EntityResponseType = HttpResponse<IStatusCategory>;
type EntityArrayResponseType = HttpResponse<IStatusCategory[]>;

@Injectable({ providedIn: 'root' })
export class StatusCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/status-categories';

  constructor(protected http: HttpClient) {}

  create(statusCategory: IStatusCategory): Observable<EntityResponseType> {
    return this.http.post<IStatusCategory>(this.resourceUrl, statusCategory, { observe: 'response' });
  }

  update(statusCategory: IStatusCategory): Observable<EntityResponseType> {
    return this.http.put<IStatusCategory>(this.resourceUrl, statusCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStatusCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStatusCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
