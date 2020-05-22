import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFacilityGroupType } from 'app/shared/model/facility-group-type.model';
import { FacilityGroupTypeService } from './facility-group-type.service';

@Component({
  templateUrl: './facility-group-type-delete-dialog.component.html'
})
export class FacilityGroupTypeDeleteDialogComponent {
  facilityGroupType?: IFacilityGroupType;

  constructor(
    protected facilityGroupTypeService: FacilityGroupTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.facilityGroupTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('facilityGroupTypeListModification');
      this.activeModal.close();
    });
  }
}
