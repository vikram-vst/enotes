import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFacilityGroup } from 'app/shared/model/facility-group.model';
import { FacilityGroupService } from './facility-group.service';

@Component({
  templateUrl: './facility-group-delete-dialog.component.html'
})
export class FacilityGroupDeleteDialogComponent {
  facilityGroup?: IFacilityGroup;

  constructor(
    protected facilityGroupService: FacilityGroupService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.facilityGroupService.delete(id).subscribe(() => {
      this.eventManager.broadcast('facilityGroupListModification');
      this.activeModal.close();
    });
  }
}
