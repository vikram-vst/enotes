import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IServiceEntry, ServiceEntry } from 'app/shared/model/service-entry.model';
import { ServiceEntryService } from './service-entry.service';
import { ServiceEntryComponent } from './service-entry.component';
import { ServiceEntryDetailComponent } from './service-entry-detail.component';
import { ServiceEntryUpdateComponent } from './service-entry-update.component';

@Injectable({ providedIn: 'root' })
export class ServiceEntryResolve implements Resolve<IServiceEntry> {
  constructor(private service: ServiceEntryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServiceEntry> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((serviceEntry: HttpResponse<ServiceEntry>) => {
          if (serviceEntry.body) {
            return of(serviceEntry.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ServiceEntry());
  }
}

export const serviceEntryRoute: Routes = [
  {
    path: '',
    component: ServiceEntryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceEntry.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ServiceEntryDetailComponent,
    resolve: {
      serviceEntry: ServiceEntryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceEntry.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ServiceEntryUpdateComponent,
    resolve: {
      serviceEntry: ServiceEntryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceEntry.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ServiceEntryUpdateComponent,
    resolve: {
      serviceEntry: ServiceEntryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceEntry.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
