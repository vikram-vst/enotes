import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGeoPoint, GeoPoint } from 'app/shared/model/geo-point.model';
import { GeoPointService } from './geo-point.service';

@Component({
  selector: 'sys-geo-point-update',
  templateUrl: './geo-point-update.component.html'
})
export class GeoPointUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    latitude: [],
    longitude: []
  });

  constructor(protected geoPointService: GeoPointService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ geoPoint }) => {
      this.updateForm(geoPoint);
    });
  }

  updateForm(geoPoint: IGeoPoint): void {
    this.editForm.patchValue({
      id: geoPoint.id,
      latitude: geoPoint.latitude,
      longitude: geoPoint.longitude
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const geoPoint = this.createFromForm();
    if (geoPoint.id !== undefined) {
      this.subscribeToSaveResponse(this.geoPointService.update(geoPoint));
    } else {
      this.subscribeToSaveResponse(this.geoPointService.create(geoPoint));
    }
  }

  private createFromForm(): IGeoPoint {
    return {
      ...new GeoPoint(),
      id: this.editForm.get(['id'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGeoPoint>>): void {
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
