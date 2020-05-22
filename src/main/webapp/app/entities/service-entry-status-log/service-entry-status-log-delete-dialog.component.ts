import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceEntryStatusLog } from 'app/shared/model/service-entry-status-log.model';
import { ServiceEntryStatusLogService } from './service-entry-status-log.service';

@Component({
  templateUrl: './service-entry-status-log-delete-dialog.component.html'
})
export class ServiceEntryStatusLogDeleteDialogComponent {
  serviceEntryStatusLog?: IServiceEntryStatusLog;

  constructor(
    protected serviceEntryStatusLogService: ServiceEntryStatusLogService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.serviceEntryStatusLogService.delete(id).subscribe(() => {
      this.eventManager.broadcast('serviceEntryStatusLogListModification');
      this.activeModal.close();
    });
  }
}
