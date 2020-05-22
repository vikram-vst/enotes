import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFacilityType } from 'app/shared/model/facility-type.model';
import { FacilityTypeService } from './facility-type.service';

@Component({
  templateUrl: './facility-type-delete-dialog.component.html'
})
export class FacilityTypeDeleteDialogComponent {
  facilityType?: IFacilityType;

  constructor(
    protected facilityTypeService: FacilityTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.facilityTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('facilityTypeListModification');
      this.activeModal.close();
    });
  }
}
