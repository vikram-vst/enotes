import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAddress, Address } from 'app/shared/model/address.model';
import { AddressService } from './address.service';
import { IStatus } from 'app/shared/model/status.model';
import { StatusService } from 'app/entities/status/status.service';
import { IGeo } from 'app/shared/model/geo.model';
import { GeoService } from 'app/entities/geo/geo.service';
import { IAddressType } from 'app/shared/model/address-type.model';
import { AddressTypeService } from 'app/entities/address-type/address-type.service';
import { IGeoPoint } from 'app/shared/model/geo-point.model';
import { GeoPointService } from 'app/entities/geo-point/geo-point.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IStatus | IGeo | IAddressType | IGeoPoint | IUser;

@Component({
  selector: 'sys-address-update',
  templateUrl: './address-update.component.html'
})
export class AddressUpdateComponent implements OnInit {
  isSaving = false;
  statuses: IStatus[] = [];
  geos: IGeo[] = [];
  addresstypes: IAddressType[] = [];
  geopoints: IGeoPoint[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    streetAddress: [null, [Validators.maxLength(60)]],
    streetAddress2: [null, [Validators.maxLength(60)]],
    city: [null, [Validators.maxLength(60)]],
    landmark: [null, [Validators.maxLength(60)]],
    postalCode: [null, [Validators.maxLength(10)]],
    note: [null, [Validators.maxLength(255)]],
    isDefault: [],
    customAddressType: [null, [Validators.maxLength(25)]],
    status: [],
    state: [],
    pincode: [],
    country: [],
    addressType: [],
    geoPoint: [],
    user: []
  });

  constructor(
    protected addressService: AddressService,
    protected statusService: StatusService,
    protected geoService: GeoService,
    protected addressTypeService: AddressTypeService,
    protected geoPointService: GeoPointService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ address }) => {
      this.updateForm(address);

      this.statusService.query().subscribe((res: HttpResponse<IStatus[]>) => (this.statuses = res.body || []));

      this.geoService.query().subscribe((res: HttpResponse<IGeo[]>) => (this.geos = res.body || []));

      this.addressTypeService.query().subscribe((res: HttpResponse<IAddressType[]>) => (this.addresstypes = res.body || []));

      this.geoPointService.query().subscribe((res: HttpResponse<IGeoPoint[]>) => (this.geopoints = res.body || []));

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(address: IAddress): void {
    this.editForm.patchValue({
      id: address.id,
      streetAddress: address.streetAddress,
      streetAddress2: address.streetAddress2,
      city: address.city,
      landmark: address.landmark,
      postalCode: address.postalCode,
      note: address.note,
      isDefault: address.isDefault,
      customAddressType: address.customAddressType,
      status: address.status,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
      addressType: address.addressType,
      geoPoint: address.geoPoint,
      user: address.user
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const address = this.createFromForm();
    if (address.id !== undefined) {
      this.subscribeToSaveResponse(this.addressService.update(address));
    } else {
      this.subscribeToSaveResponse(this.addressService.create(address));
    }
  }

  private createFromForm(): IAddress {
    return {
      ...new Address(),
      id: this.editForm.get(['id'])!.value,
      streetAddress: this.editForm.get(['streetAddress'])!.value,
      streetAddress2: this.editForm.get(['streetAddress2'])!.value,
      city: this.editForm.get(['city'])!.value,
      landmark: this.editForm.get(['landmark'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      note: this.editForm.get(['note'])!.value,
      isDefault: this.editForm.get(['isDefault'])!.value,
      customAddressType: this.editForm.get(['customAddressType'])!.value,
      status: this.editForm.get(['status'])!.value,
      state: this.editForm.get(['state'])!.value,
      pincode: this.editForm.get(['pincode'])!.value,
      country: this.editForm.get(['country'])!.value,
      addressType: this.editForm.get(['addressType'])!.value,
      geoPoint: this.editForm.get(['geoPoint'])!.value,
      user: this.editForm.get(['user'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddress>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
