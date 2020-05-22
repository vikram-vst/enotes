import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGeo, Geo } from 'app/shared/model/geo.model';
import { GeoService } from './geo.service';
import { IGeoType } from 'app/shared/model/geo-type.model';
import { GeoTypeService } from 'app/entities/geo-type/geo-type.service';

@Component({
  selector: 'sys-geo-update',
  templateUrl: './geo-update.component.html'
})
export class GeoUpdateComponent implements OnInit {
  isSaving = false;
  geotypes: IGeoType[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]],
    code: [null, [Validators.maxLength(10)]],
    abbreviation: [null, [Validators.maxLength(10)]],
    geoType: []
  });

  constructor(
    protected geoService: GeoService,
    protected geoTypeService: GeoTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ geo }) => {
      this.updateForm(geo);

      this.geoTypeService.query().subscribe((res: HttpResponse<IGeoType[]>) => (this.geotypes = res.body || []));
    });
  }

  updateForm(geo: IGeo): void {
    this.editForm.patchValue({
      id: geo.id,
      name: geo.name,
      code: geo.code,
      abbreviation: geo.abbreviation,
      geoType: geo.geoType
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const geo = this.createFromForm();
    if (geo.id !== undefined) {
      this.subscribeToSaveResponse(this.geoService.update(geo));
    } else {
      this.subscribeToSaveResponse(this.geoService.create(geo));
    }
  }

  private createFromForm(): IGeo {
    return {
      ...new Geo(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      code: this.editForm.get(['code'])!.value,
      abbreviation: this.editForm.get(['abbreviation'])!.value,
      geoType: this.editForm.get(['geoType'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGeo>>): void {
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

  trackById(index: number, item: IGeoType): any {
    return item.id;
  }
}
