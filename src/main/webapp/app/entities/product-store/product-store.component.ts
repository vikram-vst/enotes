import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductStore } from 'app/shared/model/product-store.model';
import { ProductStoreService } from './product-store.service';
import { ProductStoreDeleteDialogComponent } from './product-store-delete-dialog.component';

@Component({
  selector: 'sys-product-store',
  templateUrl: './product-store.component.html'
})
export class ProductStoreComponent implements OnInit, OnDestroy {
  productStores?: IProductStore[];
  eventSubscriber?: Subscription;

  constructor(
    protected productStoreService: ProductStoreService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productStoreService.query().subscribe((res: HttpResponse<IProductStore[]>) => (this.productStores = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductStores();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductStore): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductStores(): void {
    this.eventSubscriber = this.eventManager.subscribe('productStoreListModification', () => this.loadAll());
  }

  delete(productStore: IProductStore): void {
    const modalRef = this.modalService.open(ProductStoreDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productStore = productStore;
  }
}
