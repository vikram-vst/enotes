import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGender } from 'app/shared/model/gender.model';
import { GenderService } from './gender.service';

@Component({
  templateUrl: './gender-delete-dialog.component.html'
})
export class GenderDeleteDialogComponent {
  gender?: IGender;

  constructor(protected genderService: GenderService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.genderService.delete(id).subscribe(() => {
      this.eventManager.broadcast('genderListModification');
      this.activeModal.close();
    });
  }
}
