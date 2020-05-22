import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGeoAssoc } from 'app/shared/model/geo-assoc.model';
import { GeoAssocService } from './geo-assoc.service';

@Component({
  templateUrl: './geo-assoc-delete-dialog.component.html'
})
export class GeoAssocDeleteDialogComponent {
  geoAssoc?: IGeoAssoc;

  constructor(protected geoAssocService: GeoAssocService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.geoAssocService.delete(id).subscribe(() => {
      this.eventManager.broadcast('geoAssocListModification');
      this.activeModal.close();
    });
  }
}
