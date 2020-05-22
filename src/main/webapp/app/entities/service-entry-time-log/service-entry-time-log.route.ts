import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IServiceEntryTimeLog, ServiceEntryTimeLog } from 'app/shared/model/service-entry-time-log.model';
import { ServiceEntryTimeLogService } from './service-entry-time-log.service';
import { ServiceEntryTimeLogComponent } from './service-entry-time-log.component';
import { ServiceEntryTimeLogDetailComponent } from './service-entry-time-log-detail.component';
import { ServiceEntryTimeLogUpdateComponent } from './service-entry-time-log-update.component';

@Injectable({ providedIn: 'root' })
export class ServiceEntryTimeLogResolve implements Resolve<IServiceEntryTimeLog> {
  constructor(private service: ServiceEntryTimeLogService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServiceEntryTimeLog> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((serviceEntryTimeLog: HttpResponse<ServiceEntryTimeLog>) => {
          if (serviceEntryTimeLog.body) {
            return of(serviceEntryTimeLog.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ServiceEntryTimeLog());
  }
}

export const serviceEntryTimeLogRoute: Routes = [
  {
    path: '',
    component: ServiceEntryTimeLogComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceEntryTimeLog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ServiceEntryTimeLogDetailComponent,
    resolve: {
      serviceEntryTimeLog: ServiceEntryTimeLogResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceEntryTimeLog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ServiceEntryTimeLogUpdateComponent,
    resolve: {
      serviceEntryTimeLog: ServiceEntryTimeLogResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceEntryTimeLog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ServiceEntryTimeLogUpdateComponent,
    resolve: {
      serviceEntryTimeLog: ServiceEntryTimeLogResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceEntryTimeLog.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
