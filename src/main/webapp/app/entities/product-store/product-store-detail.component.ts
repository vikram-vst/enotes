import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductStore } from 'app/shared/model/product-store.model';

@Component({
  selector: 'sys-product-store-detail',
  templateUrl: './product-store-detail.component.html'
})
export class ProductStoreDetailComponent implements OnInit {
  productStore: IProductStore | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productStore }) => (this.productStore = productStore));
  }

  previousState(): void {
    window.history.back();
  }
}
