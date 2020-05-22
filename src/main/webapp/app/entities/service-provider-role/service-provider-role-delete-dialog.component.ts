import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceProviderRole } from 'app/shared/model/service-provider-role.model';
import { ServiceProviderRoleService } from './service-provider-role.service';

@Component({
  templateUrl: './service-provider-role-delete-dialog.component.html'
})
export class ServiceProviderRoleDeleteDialogComponent {
  serviceProviderRole?: IServiceProviderRole;

  constructor(
    protected serviceProviderRoleService: ServiceProviderRoleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.serviceProviderRoleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('serviceProviderRoleListModification');
      this.activeModal.close();
    });
  }
}
