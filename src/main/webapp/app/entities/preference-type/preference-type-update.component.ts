import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPreferenceType, PreferenceType } from 'app/shared/model/preference-type.model';
import { PreferenceTypeService } from './preference-type.service';

@Component({
  selector: 'sys-preference-type-update',
  templateUrl: './preference-type-update.component.html'
})
export class PreferenceTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]],
    description: [null, [Validators.maxLength(100)]]
  });

  constructor(protected preferenceTypeService: PreferenceTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ preferenceType }) => {
      this.updateForm(preferenceType);
    });
  }

  updateForm(preferenceType: IPreferenceType): void {
    this.editForm.patchValue({
      id: preferenceType.id,
      name: preferenceType.name,
      description: preferenceType.description
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const preferenceType = this.createFromForm();
    if (preferenceType.id !== undefined) {
      this.subscribeToSaveResponse(this.preferenceTypeService.update(preferenceType));
    } else {
      this.subscribeToSaveResponse(this.preferenceTypeService.create(preferenceType));
    }
  }

  private createFromForm(): IPreferenceType {
    return {
      ...new PreferenceType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPreferenceType>>): void {
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
