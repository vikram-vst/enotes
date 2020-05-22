import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAddressType, AddressType } from 'app/shared/model/address-type.model';
import { AddressTypeService } from './address-type.service';
import { AddressTypeComponent } from './address-type.component';
import { AddressTypeDetailComponent } from './address-type-detail.component';
import { AddressTypeUpdateComponent } from './address-type-update.component';

@Injectable({ providedIn: 'root' })
export class AddressTypeResolve implements Resolve<IAddressType> {
  constructor(private service: AddressTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAddressType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((addressType: HttpResponse<AddressType>) => {
          if (addressType.body) {
            return of(addressType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AddressType());
  }
}

export const addressTypeRoute: Routes = [
  {
    path: '',
    component: AddressTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.addressType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AddressTypeDetailComponent,
    resolve: {
      addressType: AddressTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.addressType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AddressTypeUpdateComponent,
    resolve: {
      addressType: AddressTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.addressType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AddressTypeUpdateComponent,
    resolve: {
      addressType: AddressTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.addressType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
