import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserPreference, UserPreference } from 'app/shared/model/user-preference.model';
import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceComponent } from './user-preference.component';
import { UserPreferenceDetailComponent } from './user-preference-detail.component';
import { UserPreferenceUpdateComponent } from './user-preference-update.component';

@Injectable({ providedIn: 'root' })
export class UserPreferenceResolve implements Resolve<IUserPreference> {
  constructor(private service: UserPreferenceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserPreference> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userPreference: HttpResponse<UserPreference>) => {
          if (userPreference.body) {
            return of(userPreference.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserPreference());
  }
}

export const userPreferenceRoute: Routes = [
  {
    path: '',
    component: UserPreferenceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.userPreference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserPreferenceDetailComponent,
    resolve: {
      userPreference: UserPreferenceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.userPreference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserPreferenceUpdateComponent,
    resolve: {
      userPreference: UserPreferenceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.userPreference.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserPreferenceUpdateComponent,
    resolve: {
      userPreference: UserPreferenceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.userPreference.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
