import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGeoType, GeoType } from 'app/shared/model/geo-type.model';
import { GeoTypeService } from './geo-type.service';

@Component({
  selector: 'sys-geo-type-update',
  templateUrl: './geo-type-update.component.html'
})
export class GeoTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]]
  });

  constructor(protected geoTypeService: GeoTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ geoType }) => {
      this.updateForm(geoType);
    });
  }

  updateForm(geoType: IGeoType): void {
    this.editForm.patchValue({
      id: geoType.id,
      name: geoType.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const geoType = this.createFromForm();
    if (geoType.id !== undefined) {
      this.subscribeToSaveResponse(this.geoTypeService.update(geoType));
    } else {
      this.subscribeToSaveResponse(this.geoTypeService.create(geoType));
    }
  }

  private createFromForm(): IGeoType {
    return {
      ...new GeoType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGeoType>>): void {
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
