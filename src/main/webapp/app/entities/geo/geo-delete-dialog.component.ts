import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGeo } from 'app/shared/model/geo.model';
import { GeoService } from './geo.service';

@Component({
  templateUrl: './geo-delete-dialog.component.html'
})
export class GeoDeleteDialogComponent {
  geo?: IGeo;

  constructor(protected geoService: GeoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.geoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('geoListModification');
      this.activeModal.close();
    });
  }
}
