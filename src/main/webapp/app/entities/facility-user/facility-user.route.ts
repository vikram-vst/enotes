import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFacilityUser, FacilityUser } from 'app/shared/model/facility-user.model';
import { FacilityUserService } from './facility-user.service';
import { FacilityUserComponent } from './facility-user.component';
import { FacilityUserDetailComponent } from './facility-user-detail.component';
import { FacilityUserUpdateComponent } from './facility-user-update.component';

@Injectable({ providedIn: 'root' })
export class FacilityUserResolve implements Resolve<IFacilityUser> {
  constructor(private service: FacilityUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFacilityUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((facilityUser: HttpResponse<FacilityUser>) => {
          if (facilityUser.body) {
            return of(facilityUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FacilityUser());
  }
}

export const facilityUserRoute: Routes = [
  {
    path: '',
    component: FacilityUserComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FacilityUserDetailComponent,
    resolve: {
      facilityUser: FacilityUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FacilityUserUpdateComponent,
    resolve: {
      facilityUser: FacilityUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FacilityUserUpdateComponent,
    resolve: {
      facilityUser: FacilityUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.facilityUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
