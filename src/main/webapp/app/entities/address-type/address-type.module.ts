import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { AddressTypeComponent } from './address-type.component';
import { AddressTypeDetailComponent } from './address-type-detail.component';
import { AddressTypeUpdateComponent } from './address-type-update.component';
import { AddressTypeDeleteDialogComponent } from './address-type-delete-dialog.component';
import { addressTypeRoute } from './address-type.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(addressTypeRoute)],
  declarations: [AddressTypeComponent, AddressTypeDetailComponent, AddressTypeUpdateComponent, AddressTypeDeleteDialogComponent],
  entryComponents: [AddressTypeDeleteDialogComponent]
})
export class EnotesAddressTypeModule {}
