import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFacilityType, FacilityType } from 'app/shared/model/facility-type.model';
import { FacilityTypeService } from './facility-type.service';
import { FacilityTypeComponent } from './facility-type.component';
import { FacilityTypeDetailComponent } from './facility-type-detail.component';
import { FacilityTypeUpdateComponent } from './facility-type-update.component';

@Injectable({ providedIn: 'root' })
export class FacilityTypeResolve implements Resolve<IFacilityType> {
  constructor(private service: FacilityTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFacilityType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((facilityType: HttpResponse<FacilityType>) => {
          if (facilityType.body) {
            return of(facilityType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FacilityType());
  }
}

export const facilityTypeRoute: Routes = [
  {
    path: '',
    component: FacilityTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FacilityTypeDetailComponent,
    resolve: {
      facilityType: FacilityTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FacilityTypeUpdateComponent,
    resolve: {
      facilityType: FacilityTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FacilityTypeUpdateComponent,
    resolve: {
      facilityType: FacilityTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
