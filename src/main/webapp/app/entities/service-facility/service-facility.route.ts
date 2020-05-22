import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IServiceFacility, ServiceFacility } from 'app/shared/model/service-facility.model';
import { ServiceFacilityService } from './service-facility.service';
import { ServiceFacilityComponent } from './service-facility.component';
import { ServiceFacilityDetailComponent } from './service-facility-detail.component';
import { ServiceFacilityUpdateComponent } from './service-facility-update.component';

@Injectable({ providedIn: 'root' })
export class ServiceFacilityResolve implements Resolve<IServiceFacility> {
  constructor(private service: ServiceFacilityService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServiceFacility> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((serviceFacility: HttpResponse<ServiceFacility>) => {
          if (serviceFacility.body) {
            return of(serviceFacility.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ServiceFacility());
  }
}

export const serviceFacilityRoute: Routes = [
  {
    path: '',
    component: ServiceFacilityComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceFacility.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ServiceFacilityDetailComponent,
    resolve: {
      serviceFacility: ServiceFacilityResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceFacility.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ServiceFacilityUpdateComponent,
    resolve: {
      serviceFacility: ServiceFacilityResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceFacility.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ServiceFacilityUpdateComponent,
    resolve: {
      serviceFacility: ServiceFacilityResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceFacility.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
