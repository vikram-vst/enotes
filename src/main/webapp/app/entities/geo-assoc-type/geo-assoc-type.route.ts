import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGeoAssocType, GeoAssocType } from 'app/shared/model/geo-assoc-type.model';
import { GeoAssocTypeService } from './geo-assoc-type.service';
import { GeoAssocTypeComponent } from './geo-assoc-type.component';
import { GeoAssocTypeDetailComponent } from './geo-assoc-type-detail.component';
import { GeoAssocTypeUpdateComponent } from './geo-assoc-type-update.component';

@Injectable({ providedIn: 'root' })
export class GeoAssocTypeResolve implements Resolve<IGeoAssocType> {
  constructor(private service: GeoAssocTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGeoAssocType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((geoAssocType: HttpResponse<GeoAssocType>) => {
          if (geoAssocType.body) {
            return of(geoAssocType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GeoAssocType());
  }
}

export const geoAssocTypeRoute: Routes = [
  {
    path: '',
    component: GeoAssocTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoAssocType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GeoAssocTypeDetailComponent,
    resolve: {
      geoAssocType: GeoAssocTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoAssocType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GeoAssocTypeUpdateComponent,
    resolve: {
      geoAssocType: GeoAssocTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoAssocType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GeoAssocTypeUpdateComponent,
    resolve: {
      geoAssocType: GeoAssocTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.geoAssocType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
