import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductStore, ProductStore } from 'app/shared/model/product-store.model';
import { ProductStoreService } from './product-store.service';
import { ProductStoreComponent } from './product-store.component';
import { ProductStoreDetailComponent } from './product-store-detail.component';
import { ProductStoreUpdateComponent } from './product-store-update.component';

@Injectable({ providedIn: 'root' })
export class ProductStoreResolve implements Resolve<IProductStore> {
  constructor(private service: ProductStoreService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductStore> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productStore: HttpResponse<ProductStore>) => {
          if (productStore.body) {
            return of(productStore.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductStore());
  }
}

export const productStoreRoute: Routes = [
  {
    path: '',
    component: ProductStoreComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.productStore.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductStoreDetailComponent,
    resolve: {
      productStore: ProductStoreResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.productStore.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductStoreUpdateComponent,
    resolve: {
      productStore: ProductStoreResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.productStore.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductStoreUpdateComponent,
    resolve: {
      productStore: ProductStoreResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'enotesApp.productStore.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
