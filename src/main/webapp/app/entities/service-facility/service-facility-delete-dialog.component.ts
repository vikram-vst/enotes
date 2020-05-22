import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceFacility } from 'app/shared/model/service-facility.model';
import { ServiceFacilityService } from './service-facility.service';

@Component({
  templateUrl: './service-facility-delete-dialog.component.html'
})
export class ServiceFacilityDeleteDialogComponent {
  serviceFacility?: IServiceFacility;

  constructor(
    protected serviceFacilityService: ServiceFacilityService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.serviceFacilityService.delete(id).subscribe(() => {
      this.eventManager.broadcast('serviceFacilityListModification');
      this.activeModal.close();
    });
  }
}
