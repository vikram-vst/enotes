import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductStore } from 'app/shared/model/product-store.model';

type EntityResponseType = HttpResponse<IProductStore>;
type EntityArrayResponseType = HttpResponse<IProductStore[]>;

@Injectable({ providedIn: 'root' })
export class ProductStoreService {
  public resourceUrl = SERVER_API_URL + 'api/product-stores';

  constructor(protected http: HttpClient) {}

  create(productStore: IProductStore): Observable<EntityResponseType> {
    return this.http.post<IProductStore>(this.resourceUrl, productStore, { observe: 'response' });
  }

  update(productStore: IProductStore): Observable<EntityResponseType> {
    return this.http.put<IProductStore>(this.resourceUrl, productStore, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductStore>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductStore[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
