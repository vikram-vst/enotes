import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOtpAuth } from 'app/shared/model/otp-auth.model';
import { OtpAuthService } from './otp-auth.service';

@Component({
  templateUrl: './otp-auth-delete-dialog.component.html'
})
export class OtpAuthDeleteDialogComponent {
  otpAuth?: IOtpAuth;

  constructor(protected otpAuthService: OtpAuthService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.otpAuthService.delete(id).subscribe(() => {
      this.eventManager.broadcast('otpAuthListModification');
      this.activeModal.close();
    });
  }
}
