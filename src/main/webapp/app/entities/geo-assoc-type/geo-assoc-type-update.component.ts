import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGeoAssocType, GeoAssocType } from 'app/shared/model/geo-assoc-type.model';
import { GeoAssocTypeService } from './geo-assoc-type.service';

@Component({
  selector: 'sys-geo-assoc-type-update',
  templateUrl: './geo-assoc-type-update.component.html'
})
export class GeoAssocTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]]
  });

  constructor(protected geoAssocTypeService: GeoAssocTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ geoAssocType }) => {
      this.updateForm(geoAssocType);
    });
  }

  updateForm(geoAssocType: IGeoAssocType): void {
    this.editForm.patchValue({
      id: geoAssocType.id,
      name: geoAssocType.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const geoAssocType = this.createFromForm();
    if (geoAssocType.id !== undefined) {
      this.subscribeToSaveResponse(this.geoAssocTypeService.update(geoAssocType));
    } else {
      this.subscribeToSaveResponse(this.geoAssocTypeService.create(geoAssocType));
    }
  }

  private createFromForm(): IGeoAssocType {
    return {
      ...new GeoAssocType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGeoAssocType>>): void {
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
