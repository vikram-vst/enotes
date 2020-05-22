import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAddressType } from 'app/shared/model/address-type.model';
import { AddressTypeService } from './address-type.service';
import { AddressTypeDeleteDialogComponent } from './address-type-delete-dialog.component';

@Component({
  selector: 'sys-address-type',
  templateUrl: './address-type.component.html'
})
export class AddressTypeComponent implements OnInit, OnDestroy {
  addressTypes?: IAddressType[];
  eventSubscriber?: Subscription;

  constructor(
    protected addressTypeService: AddressTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.addressTypeService.query().subscribe((res: HttpResponse<IAddressType[]>) => (this.addressTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAddressTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAddressType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAddressTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('addressTypeListModification', () => this.loadAll());
  }

  delete(addressType: IAddressType): void {
    const modalRef = this.modalService.open(AddressTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.addressType = addressType;
  }
}
