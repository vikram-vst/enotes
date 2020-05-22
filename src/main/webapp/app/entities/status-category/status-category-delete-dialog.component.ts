import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStatusCategory } from 'app/shared/model/status-category.model';
import { StatusCategoryService } from './status-category.service';

@Component({
  templateUrl: './status-category-delete-dialog.component.html'
})
export class StatusCategoryDeleteDialogComponent {
  statusCategory?: IStatusCategory;

  constructor(
    protected statusCategoryService: StatusCategoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.statusCategoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('statusCategoryListModification');
      this.activeModal.close();
    });
  }
}
