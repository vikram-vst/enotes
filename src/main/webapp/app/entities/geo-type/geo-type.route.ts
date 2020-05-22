import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGeoType, GeoType } from 'app/shared/model/geo-type.model';
import { GeoTypeService } from './geo-type.service';
import { GeoTypeComponent } from './geo-type.component';
import { GeoTypeDetailComponent } from './geo-type-detail.component';
import { GeoTypeUpdateComponent } from './geo-type-update.component';

@Injectable({ providedIn: 'root' })
export class GeoTypeResolve implements Resolve<IGeoType> {
  constructor(private service: GeoTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGeoType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((geoType: HttpResponse<GeoType>) => {
          if (geoType.body) {
            return of(geoType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GeoType());
  }
}

export const geoTypeRoute: Routes = [
  {
    path: '',
    component: GeoTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GeoTypeDetailComponent,
    resolve: {
      geoType: GeoTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GeoTypeUpdateComponent,
    resolve: {
      geoType: GeoTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GeoTypeUpdateComponent,
    resolve: {
      geoType: GeoTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
