import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceEntryTimeLog } from 'app/shared/model/service-entry-time-log.model';
import { ServiceEntryTimeLogService } from './service-entry-time-log.service';

@Component({
  templateUrl: './service-entry-time-log-delete-dialog.component.html'
})
export class ServiceEntryTimeLogDeleteDialogComponent {
  serviceEntryTimeLog?: IServiceEntryTimeLog;

  constructor(
    protected serviceEntryTimeLogService: ServiceEntryTimeLogService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.serviceEntryTimeLogService.delete(id).subscribe(() => {
      this.eventManager.broadcast('serviceEntryTimeLogListModification');
      this.activeModal.close();
    });
  }
}
