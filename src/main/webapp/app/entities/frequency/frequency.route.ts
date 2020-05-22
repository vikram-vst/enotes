import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFrequency, Frequency } from 'app/shared/model/frequency.model';
import { FrequencyService } from './frequency.service';
import { FrequencyComponent } from './frequency.component';
import { FrequencyDetailComponent } from './frequency-detail.component';
import { FrequencyUpdateComponent } from './frequency-update.component';

@Injectable({ providedIn: 'root' })
export class FrequencyResolve implements Resolve<IFrequency> {
  constructor(private service: FrequencyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFrequency> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((frequency: HttpResponse<Frequency>) => {
          if (frequency.body) {
            return of(frequency.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Frequency());
  }
}

export const frequencyRoute: Routes = [
  {
    path: '',
    component: FrequencyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.frequency.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FrequencyDetailComponent,
    resolve: {
      frequency: FrequencyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.frequency.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FrequencyUpdateComponent,
    resolve: {
      frequency: FrequencyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.frequency.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FrequencyUpdateComponent,
    resolve: {
      frequency: FrequencyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.frequency.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
