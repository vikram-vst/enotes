import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAddressType } from 'app/shared/model/address-type.model';
import { AddressTypeService } from './address-type.service';

@Component({
  templateUrl: './address-type-delete-dialog.component.html'
})
export class AddressTypeDeleteDialogComponent {
  addressType?: IAddressType;

  constructor(
    protected addressTypeService: AddressTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.addressTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('addressTypeListModification');
      this.activeModal.close();
    });
  }
}
