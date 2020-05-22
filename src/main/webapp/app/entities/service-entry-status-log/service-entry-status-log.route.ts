import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IServiceEntryStatusLog, ServiceEntryStatusLog } from 'app/shared/model/service-entry-status-log.model';
import { ServiceEntryStatusLogService } from './service-entry-status-log.service';
import { ServiceEntryStatusLogComponent } from './service-entry-status-log.component';
import { ServiceEntryStatusLogDetailComponent } from './service-entry-status-log-detail.component';
import { ServiceEntryStatusLogUpdateComponent } from './service-entry-status-log-update.component';

@Injectable({ providedIn: 'root' })
export class ServiceEntryStatusLogResolve implements Resolve<IServiceEntryStatusLog> {
  constructor(private service: ServiceEntryStatusLogService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServiceEntryStatusLog> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((serviceEntryStatusLog: HttpResponse<ServiceEntryStatusLog>) => {
          if (serviceEntryStatusLog.body) {
            return of(serviceEntryStatusLog.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ServiceEntryStatusLog());
  }
}

export const serviceEntryStatusLogRoute: Routes = [
  {
    path: '',
    component: ServiceEntryStatusLogComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceEntryStatusLog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ServiceEntryStatusLogDetailComponent,
    resolve: {
      serviceEntryStatusLog: ServiceEntryStatusLogResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceEntryStatusLog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ServiceEntryStatusLogUpdateComponent,
    resolve: {
      serviceEntryStatusLog: ServiceEntryStatusLogResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceEntryStatusLog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ServiceEntryStatusLogUpdateComponent,
    resolve: {
      serviceEntryStatusLog: ServiceEntryStatusLogResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceEntryStatusLog.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
