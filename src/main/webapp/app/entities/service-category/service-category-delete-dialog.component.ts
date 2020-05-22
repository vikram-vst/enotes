import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceCategory } from 'app/shared/model/service-category.model';
import { ServiceCategoryService } from './service-category.service';

@Component({
  templateUrl: './service-category-delete-dialog.component.html'
})
export class ServiceCategoryDeleteDialogComponent {
  serviceCategory?: IServiceCategory;

  constructor(
    protected serviceCategoryService: ServiceCategoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.serviceCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('serviceCategoryListModification');
      this.activeModal.close();
    });
  }
}
