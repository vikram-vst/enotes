import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAddressType, AddressType } from 'app/shared/model/address-type.model';
import { AddressTypeService } from './address-type.service';

@Component({
  selector: 'sys-address-type-update',
  templateUrl: './address-type-update.component.html'
})
export class AddressTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]]
  });

  constructor(protected addressTypeService: AddressTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ addressType }) => {
      this.updateForm(addressType);
    });
  }

  updateForm(addressType: IAddressType): void {
    this.editForm.patchValue({
      id: addressType.id,
      name: addressType.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const addressType = this.createFromForm();
    if (addressType.id !== undefined) {
      this.subscribeToSaveResponse(this.addressTypeService.update(addressType));
    } else {
      this.subscribeToSaveResponse(this.addressTypeService.create(addressType));
    }
  }

  private createFromForm(): IAddressType {
    return {
      ...new AddressType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddressType>>): void {
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
}
