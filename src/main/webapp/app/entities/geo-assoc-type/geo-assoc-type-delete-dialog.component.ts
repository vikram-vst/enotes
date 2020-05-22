import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGeoAssocType } from 'app/shared/model/geo-assoc-type.model';
import { GeoAssocTypeService } from './geo-assoc-type.service';

@Component({
  templateUrl: './geo-assoc-type-delete-dialog.component.html'
})
export class GeoAssocTypeDeleteDialogComponent {
  geoAssocType?: IGeoAssocType;

  constructor(
    protected geoAssocTypeService: GeoAssocTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.geoAssocTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('geoAssocTypeListModification');
      this.activeModal.close();
    });
  }
}
