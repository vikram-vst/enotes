import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPreferenceType } from 'app/shared/model/preference-type.model';
import { PreferenceTypeService } from './preference-type.service';

@Component({
  templateUrl: './preference-type-delete-dialog.component.html'
})
export class PreferenceTypeDeleteDialogComponent {
  preferenceType?: IPreferenceType;

  constructor(
    protected preferenceTypeService: PreferenceTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.preferenceTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('preferenceTypeListModification');
      this.activeModal.close();
    });
  }
}
