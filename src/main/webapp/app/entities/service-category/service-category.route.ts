import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IServiceCategory, ServiceCategory } from 'app/shared/model/service-category.model';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryComponent } from './service-category.component';
import { ServiceCategoryDetailComponent } from './service-category-detail.component';
import { ServiceCategoryUpdateComponent } from './service-category-update.component';

@Injectable({ providedIn: 'root' })
export class ServiceCategoryResolve implements Resolve<IServiceCategory> {
  constructor(private service: ServiceCategoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServiceCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((serviceCategory: HttpResponse<ServiceCategory>) => {
          if (serviceCategory.body) {
            return of(serviceCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ServiceCategory());
  }
}

export const serviceCategoryRoute: Routes = [
  {
    path: '',
    component: ServiceCategoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ServiceCategoryDetailComponent,
    resolve: {
      serviceCategory: ServiceCategoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ServiceCategoryUpdateComponent,
    resolve: {
      serviceCategory: ServiceCategoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ServiceCategoryUpdateComponent,
    resolve: {
      serviceCategory: ServiceCategoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.serviceCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
