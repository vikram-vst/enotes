import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFacilityGroupType, FacilityGroupType } from 'app/shared/model/facility-group-type.model';
import { FacilityGroupTypeService } from './facility-group-type.service';
import { FacilityGroupTypeComponent } from './facility-group-type.component';
import { FacilityGroupTypeDetailComponent } from './facility-group-type-detail.component';
import { FacilityGroupTypeUpdateComponent } from './facility-group-type-update.component';

@Injectable({ providedIn: 'root' })
export class FacilityGroupTypeResolve implements Resolve<IFacilityGroupType> {
  constructor(private service: FacilityGroupTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFacilityGroupType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((facilityGroupType: HttpResponse<FacilityGroupType>) => {
          if (facilityGroupType.body) {
            return of(facilityGroupType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FacilityGroupType());
  }
}

export const facilityGroupTypeRoute: Routes = [
  {
    path: '',
    component: FacilityGroupTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityGroupType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FacilityGroupTypeDetailComponent,
    resolve: {
      facilityGroupType: FacilityGroupTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityGroupType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FacilityGroupTypeUpdateComponent,
    resolve: {
      facilityGroupType: FacilityGroupTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityGroupType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FacilityGroupTypeUpdateComponent,
    resolve: {
      facilityGroupType: FacilityGroupTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityGroupType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
