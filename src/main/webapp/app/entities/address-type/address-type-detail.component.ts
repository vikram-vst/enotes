import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAddressType } from 'app/shared/model/address-type.model';

@Component({
  selector: 'sys-address-type-detail',
  templateUrl: './address-type-detail.component.html'
})
export class AddressTypeDetailComponent implements OnInit {
  addressType: IAddressType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ addressType }) => (this.addressType = addressType));
  }

  previousState(): void {
    window.history.back();
  }
}
