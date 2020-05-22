import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOtpAuth, OtpAuth } from 'app/shared/model/otp-auth.model';
import { OtpAuthService } from './otp-auth.service';
import { OtpAuthComponent } from './otp-auth.component';
import { OtpAuthDetailComponent } from './otp-auth-detail.component';
import { OtpAuthUpdateComponent } from './otp-auth-update.component';

@Injectable({ providedIn: 'root' })
export class OtpAuthResolve implements Resolve<IOtpAuth> {
  constructor(private service: OtpAuthService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOtpAuth> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((otpAuth: HttpResponse<OtpAuth>) => {
          if (otpAuth.body) {
            return of(otpAuth.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OtpAuth());
  }
}

export const otpAuthRoute: Routes = [
  {
    path: '',
    component: OtpAuthComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.otpAuth.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OtpAuthDetailComponent,
    resolve: {
      otpAuth: OtpAuthResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.otpAuth.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OtpAuthUpdateComponent,
    resolve: {
      otpAuth: OtpAuthResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.otpAuth.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OtpAuthUpdateComponent,
    resolve: {
      otpAuth: OtpAuthResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.otpAuth.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
