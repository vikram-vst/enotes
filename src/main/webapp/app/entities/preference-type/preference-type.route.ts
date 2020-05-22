import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPreferenceType, PreferenceType } from 'app/shared/model/preference-type.model';
import { PreferenceTypeService } from './preference-type.service';
import { PreferenceTypeComponent } from './preference-type.component';
import { PreferenceTypeDetailComponent } from './preference-type-detail.component';
import { PreferenceTypeUpdateComponent } from './preference-type-update.component';

@Injectable({ providedIn: 'root' })
export class PreferenceTypeResolve implements Resolve<IPreferenceType> {
  constructor(private service: PreferenceTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPreferenceType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((preferenceType: HttpResponse<PreferenceType>) => {
          if (preferenceType.body) {
            return of(preferenceType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PreferenceType());
  }
}

export const preferenceTypeRoute: Routes = [
  {
    path: '',
    component: PreferenceTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.preferenceType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PreferenceTypeDetailComponent,
    resolve: {
      preferenceType: PreferenceTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.preferenceType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PreferenceTypeUpdateComponent,
    resolve: {
      preferenceType: PreferenceTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.preferenceType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PreferenceTypeUpdateComponent,
    resolve: {
      preferenceType: PreferenceTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.preferenceType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
