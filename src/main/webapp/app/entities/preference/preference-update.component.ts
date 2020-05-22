import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPreference, Preference } from 'app/shared/model/preference.model';
import { PreferenceService } from './preference.service';
import { IPreferenceType } from 'app/shared/model/preference-type.model';
import { PreferenceTypeService } from 'app/entities/preference-type/preference-type.service';

@Component({
  selector: 'sys-preference-update',
  templateUrl: './preference-update.component.html'
})
export class PreferenceUpdateComponent implements OnInit {
  isSaving = false;
  preferencetypes: IPreferenceType[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]],
    preferenceType: []
  });

  constructor(
    protected preferenceService: PreferenceService,
    protected preferenceTypeService: PreferenceTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ preference }) => {
      this.updateForm(preference);

      this.preferenceTypeService.query().subscribe((res: HttpResponse<IPreferenceType[]>) => (this.preferencetypes = res.body || []));
    });
  }

  updateForm(preference: IPreference): void {
    this.editForm.patchValue({
      id: preference.id,
      name: preference.name,
      preferenceType: preference.preferenceType
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const preference = this.createFromForm();
    if (preference.id !== undefined) {
      this.subscribeToSaveResponse(this.preferenceService.update(preference));
    } else {
      this.subscribeToSaveResponse(this.preferenceService.create(preference));
    }
  }

  private createFromForm(): IPreference {
    return {
      ...new Preference(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      preferenceType: this.editForm.get(['preferenceType'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPreference>>): void {
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

  trackById(index: number, item: IPreferenceType): any {
    return item.id;
  }
}
