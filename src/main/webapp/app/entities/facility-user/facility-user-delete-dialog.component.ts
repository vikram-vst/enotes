import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFacilityUser } from 'app/shared/model/facility-user.model';
import { FacilityUserService } from './facility-user.service';

@Component({
  templateUrl: './facility-user-delete-dialog.component.html'
})
export class FacilityUserDeleteDialogComponent {
  facilityUser?: IFacilityUser;

  constructor(
    protected facilityUserService: FacilityUserService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.facilityUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('facilityUserListModification');
      this.activeModal.close();
    });
  }
}
