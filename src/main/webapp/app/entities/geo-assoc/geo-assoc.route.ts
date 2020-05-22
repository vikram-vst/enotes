import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGeoAssoc, GeoAssoc } from 'app/shared/model/geo-assoc.model';
import { GeoAssocService } from './geo-assoc.service';
import { GeoAssocComponent } from './geo-assoc.component';
import { GeoAssocDetailComponent } from './geo-assoc-detail.component';
import { GeoAssocUpdateComponent } from './geo-assoc-update.component';

@Injectable({ providedIn: 'root' })
export class GeoAssocResolve implements Resolve<IGeoAssoc> {
  constructor(private service: GeoAssocService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGeoAssoc> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((geoAssoc: HttpResponse<GeoAssoc>) => {
          if (geoAssoc.body) {
            return of(geoAssoc.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GeoAssoc());
  }
}

export const geoAssocRoute: Routes = [
  {
    path: '',
    component: GeoAssocComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoAssoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GeoAssocDetailComponent,
    resolve: {
      geoAssoc: GeoAssocResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoAssoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GeoAssocUpdateComponent,
    resolve: {
      geoAssoc: GeoAssocResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoAssoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GeoAssocUpdateComponent,
    resolve: {
      geoAssoc: GeoAssocResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoAssoc.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
