import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFrequency } from 'app/shared/model/frequency.model';
import { FrequencyService } from './frequency.service';

@Component({
  templateUrl: './frequency-delete-dialog.component.html'
})
export class FrequencyDeleteDialogComponent {
  frequency?: IFrequency;

  constructor(protected frequencyService: FrequencyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.frequencyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('frequencyListModification');
      this.activeModal.close();
    });
  }
}
