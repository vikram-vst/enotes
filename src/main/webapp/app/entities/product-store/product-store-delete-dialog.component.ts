import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductStore } from 'app/shared/model/product-store.model';
import { ProductStoreService } from './product-store.service';

@Component({
  templateUrl: './product-store-delete-dialog.component.html'
})
export class ProductStoreDeleteDialogComponent {
  productStore?: IProductStore;

  constructor(
    protected productStoreService: ProductStoreService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productStoreService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productStoreListModification');
      this.activeModal.close();
    });
  }
}
