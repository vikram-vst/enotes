import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IServiceProviderRole, ServiceProviderRole } from 'app/shared/model/service-provider-role.model';
import { ServiceProviderRoleService } from './service-provider-role.service';
import { ServiceProviderRoleComponent } from './service-provider-role.component';
import { ServiceProviderRoleDetailComponent } from './service-provider-role-detail.component';
import { ServiceProviderRoleUpdateComponent } from './service-provider-role-update.component';

@Injectable({ providedIn: 'root' })
export class ServiceProviderRoleResolve implements Resolve<IServiceProviderRole> {
  constructor(private service: ServiceProviderRoleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServiceProviderRole> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((serviceProviderRole: HttpResponse<ServiceProviderRole>) => {
          if (serviceProviderRole.body) {
            return of(serviceProviderRole.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ServiceProviderRole());
  }
}

export const serviceProviderRoleRoute: Routes = [
  {
    path: '',
    component: ServiceProviderRoleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceProviderRole.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ServiceProviderRoleDetailComponent,
    resolve: {
      serviceProviderRole: ServiceProviderRoleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceProviderRole.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ServiceProviderRoleUpdateComponent,
    resolve: {
      serviceProviderRole: ServiceProviderRoleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceProviderRole.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ServiceProviderRoleUpdateComponent,
    resolve: {
      serviceProviderRole: ServiceProviderRoleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceProviderRole.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
