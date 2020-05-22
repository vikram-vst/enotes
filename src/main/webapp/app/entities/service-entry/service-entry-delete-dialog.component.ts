import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceEntry } from 'app/shared/model/service-entry.model';
import { ServiceEntryService } from './service-entry.service';

@Component({
  templateUrl: './service-entry-delete-dialog.component.html'
})
export class ServiceEntryDeleteDialogComponent {
  serviceEntry?: IServiceEntry;

  constructor(
    protected serviceEntryService: ServiceEntryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.serviceEntryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('serviceEntryListModification');
      this.activeModal.close();
    });
  }
}
