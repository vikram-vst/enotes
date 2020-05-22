import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserPreference } from 'app/shared/model/user-preference.model';
import { UserPreferenceService } from './user-preference.service';

@Component({
  templateUrl: './user-preference-delete-dialog.component.html'
})
export class UserPreferenceDeleteDialogComponent {
  userPreference?: IUserPreference;

  constructor(
    protected userPreferenceService: UserPreferenceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userPreferenceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userPreferenceListModification');
      this.activeModal.close();
    });
  }
}
