import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFacilityGroupType, FacilityGroupType } from 'app/shared/model/facility-group-type.model';
import { FacilityGroupTypeService } from './facility-group-type.service';

@Component({
  selector: 'sys-facility-group-type-update',
  templateUrl: './facility-group-type-update.component.html'
})
export class FacilityGroupTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]],
    description: [null, [Validators.maxLength(60)]]
  });

  constructor(
    protected facilityGroupTypeService: FacilityGroupTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facilityGroupType }) => {
      this.updateForm(facilityGroupType);
    });
  }

  updateForm(facilityGroupType: IFacilityGroupType): void {
    this.editForm.patchValue({
      id: facilityGroupType.id,
      name: facilityGroupType.name,
      description: facilityGroupType.description
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const facilityGroupType = this.createFromForm();
    if (facilityGroupType.id !== undefined) {
      this.subscribeToSaveResponse(this.facilityGroupTypeService.update(facilityGroupType));
    } else {
      this.subscribeToSaveResponse(this.facilityGroupTypeService.create(facilityGroupType));
    }
  }

  private createFromForm(): IFacilityGroupType {
    return {
      ...new FacilityGroupType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacilityGroupType>>): void {
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
