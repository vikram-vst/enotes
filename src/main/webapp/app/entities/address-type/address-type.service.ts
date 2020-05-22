import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAddressType } from 'app/shared/model/address-type.model';

type EntityResponseType = HttpResponse<IAddressType>;
type EntityArrayResponseType = HttpResponse<IAddressType[]>;

@Injectable({ providedIn: 'root' })
export class AddressTypeService {
  public resourceUrl = SERVER_API_URL + 'api/address-types';

  constructor(protected http: HttpClient) {}

  create(addressType: IAddressType): Observable<EntityResponseType> {
    return this.http.post<IAddressType>(this.resourceUrl, addressType, { observe: 'response' });
  }

  update(addressType: IAddressType): Observable<EntityResponseType> {
    return this.http.put<IAddressType>(this.resourceUrl, addressType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAddressType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAddressType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
