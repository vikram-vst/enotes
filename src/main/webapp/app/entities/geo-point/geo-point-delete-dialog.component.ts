import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGeoPoint } from 'app/shared/model/geo-point.model';
import { GeoPointService } from './geo-point.service';

@Component({
  templateUrl: './geo-point-delete-dialog.component.html'
})
export class GeoPointDeleteDialogComponent {
  geoPoint?: IGeoPoint;

  constructor(protected geoPointService: GeoPointService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.geoPointService.delete(id).subscribe(() => {
      this.eventManager.broadcast('geoPointListModification');
      this.activeModal.close();
    });
  }
}
