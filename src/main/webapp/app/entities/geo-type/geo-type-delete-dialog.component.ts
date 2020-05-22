import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGeoType } from 'app/shared/model/geo-type.model';
import { GeoTypeService } from './geo-type.service';

@Component({
  templateUrl: './geo-type-delete-dialog.component.html'
})
export class GeoTypeDeleteDialogComponent {
  geoType?: IGeoType;

  constructor(protected geoTypeService: GeoTypeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.geoTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('geoTypeListModification');
      this.activeModal.close();
    });
  }
}
