import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGeoAssoc, GeoAssoc } from 'app/shared/model/geo-assoc.model';
import { GeoAssocService } from './geo-assoc.service';
import { IGeo } from 'app/shared/model/geo.model';
import { GeoService } from 'app/entities/geo/geo.service';
import { IGeoAssocType } from 'app/shared/model/geo-assoc-type.model';
import { GeoAssocTypeService } from 'app/entities/geo-assoc-type/geo-assoc-type.service';

type SelectableEntity = IGeo | IGeoAssocType;

@Component({
  selector: 'sys-geo-assoc-update',
  templateUrl: './geo-assoc-update.component.html'
})
export class GeoAssocUpdateComponent implements OnInit {
  isSaving = false;
  geos: IGeo[] = [];
  geoassoctypes: IGeoAssocType[] = [];

  editForm = this.fb.group({
    id: [],
    geo: [],
    geoTo: [],
    geoAssocType: []
  });

  constructor(
    protected geoAssocService: GeoAssocService,
    protected geoService: GeoService,
    protected geoAssocTypeService: GeoAssocTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ geoAssoc }) => {
      this.updateForm(geoAssoc);

      this.geoService.query().subscribe((res: HttpResponse<IGeo[]>) => (this.geos = res.body || []));

      this.geoAssocTypeService.query().subscribe((res: HttpResponse<IGeoAssocType[]>) => (this.geoassoctypes = res.body || []));
    });
  }

  updateForm(geoAssoc: IGeoAssoc): void {
    this.editForm.patchValue({
      id: geoAssoc.id,
      geo: geoAssoc.geo,
      geoTo: geoAssoc.geoTo,
      geoAssocType: geoAssoc.geoAssocType
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const geoAssoc = this.createFromForm();
    if (geoAssoc.id !== undefined) {
      this.subscribeToSaveResponse(this.geoAssocService.update(geoAssoc));
    } else {
      this.subscribeToSaveResponse(this.geoAssocService.create(geoAssoc));
    }
  }

  private createFromForm(): IGeoAssoc {
    return {
      ...new GeoAssoc(),
      id: this.editForm.get(['id'])!.value,
      geo: this.editForm.get(['geo'])!.value,
      geoTo: this.editForm.get(['geoTo'])!.value,
      geoAssocType: this.editForm.get(['geoAssocType'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGeoAssoc>>): void {
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
