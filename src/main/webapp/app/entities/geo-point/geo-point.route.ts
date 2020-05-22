import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGeoPoint, GeoPoint } from 'app/shared/model/geo-point.model';
import { GeoPointService } from './geo-point.service';
import { GeoPointComponent } from './geo-point.component';
import { GeoPointDetailComponent } from './geo-point-detail.component';
import { GeoPointUpdateComponent } from './geo-point-update.component';

@Injectable({ providedIn: 'root' })
export class GeoPointResolve implements Resolve<IGeoPoint> {
  constructor(private service: GeoPointService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGeoPoint> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((geoPoint: HttpResponse<GeoPoint>) => {
          if (geoPoint.body) {
            return of(geoPoint.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GeoPoint());
  }
}

export const geoPointRoute: Routes = [
  {
    path: '',
    component: GeoPointComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoPoint.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GeoPointDetailComponent,
    resolve: {
      geoPoint: GeoPointResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoPoint.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GeoPointUpdateComponent,
    resolve: {
      geoPoint: GeoPointResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoPoint.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GeoPointUpdateComponent,
    resolve: {
      geoPoint: GeoPointResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoPoint.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
