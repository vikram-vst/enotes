import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStatusCategory, StatusCategory } from 'app/shared/model/status-category.model';
import { StatusCategoryService } from './status-category.service';
import { StatusCategoryComponent } from './status-category.component';
import { StatusCategoryDetailComponent } from './status-category-detail.component';
import { StatusCategoryUpdateComponent } from './status-category-update.component';

@Injectable({ providedIn: 'root' })
export class StatusCategoryResolve implements Resolve<IStatusCategory> {
  constructor(private service: StatusCategoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStatusCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((statusCategory: HttpResponse<StatusCategory>) => {
          if (statusCategory.body) {
            return of(statusCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StatusCategory());
  }
}

export const statusCategoryRoute: Routes = [
  {
    path: '',
    component: StatusCategoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.statusCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StatusCategoryDetailComponent,
    resolve: {
      statusCategory: StatusCategoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.statusCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StatusCategoryUpdateComponent,
    resolve: {
      statusCategory: StatusCategoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.statusCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StatusCategoryUpdateComponent,
    resolve: {
      statusCategory: StatusCategoryResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.statusCategory.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
