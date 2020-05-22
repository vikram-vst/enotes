import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFacilityGroup, FacilityGroup } from 'app/shared/model/facility-group.model';
import { FacilityGroupService } from './facility-group.service';
import { FacilityGroupComponent } from './facility-group.component';
import { FacilityGroupDetailComponent } from './facility-group-detail.component';
import { FacilityGroupUpdateComponent } from './facility-group-update.component';

@Injectable({ providedIn: 'root' })
export class FacilityGroupResolve implements Resolve<IFacilityGroup> {
  constructor(private service: FacilityGroupService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFacilityGroup> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((facilityGroup: HttpResponse<FacilityGroup>) => {
          if (facilityGroup.body) {
            return of(facilityGroup.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FacilityGroup());
  }
}

export const facilityGroupRoute: Routes = [
  {
    path: '',
    component: FacilityGroupComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityGroup.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FacilityGroupDetailComponent,
    resolve: {
      facilityGroup: FacilityGroupResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityGroup.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FacilityGroupUpdateComponent,
    resolve: {
      facilityGroup: FacilityGroupResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityGroup.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FacilityGroupUpdateComponent,
    resolve: {
      facilityGroup: FacilityGroupResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityGroup.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
