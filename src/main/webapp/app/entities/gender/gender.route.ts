import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGender, Gender } from 'app/shared/model/gender.model';
import { GenderService } from './gender.service';
import { GenderComponent } from './gender.component';
import { GenderDetailComponent } from './gender-detail.component';
import { GenderUpdateComponent } from './gender-update.component';

@Injectable({ providedIn: 'root' })
export class GenderResolve implements Resolve<IGender> {
  constructor(private service: GenderService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGender> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((gender: HttpResponse<Gender>) => {
          if (gender.body) {
            return of(gender.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Gender());
  }
}

export const genderRoute: Routes = [
  {
    path: '',
    component: GenderComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.gender.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GenderDetailComponent,
    resolve: {
      gender: GenderResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.gender.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GenderUpdateComponent,
    resolve: {
      gender: GenderResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.gender.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GenderUpdateComponent,
    resolve: {
      gender: GenderResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.gender.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
