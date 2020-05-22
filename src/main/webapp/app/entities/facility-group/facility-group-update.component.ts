import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFacilityGroup, FacilityGroup } from 'app/shared/model/facility-group.model';
import { FacilityGroupService } from './facility-group.service';
import { IFacilityGroupType } from 'app/shared/model/facility-group-type.model';
import { FacilityGroupTypeService } from 'app/entities/facility-group-type/facility-group-type.service';

@Component({
  selector: 'sys-facility-group-update',
  templateUrl: './facility-group-update.component.html'
})
export class FacilityGroupUpdateComponent implements OnInit {
  isSaving = false;
  facilitygrouptypes: IFacilityGroupType[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]],
    facilityGroupType: []
  });

  constructor(
    protected facilityGroupService: FacilityGroupService,
    protected facilityGroupTypeService: FacilityGroupTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facilityGroup }) => {
      this.updateForm(facilityGroup);

      this.facilityGroupTypeService
        .query()
        .subscribe((res: HttpResponse<IFacilityGroupType[]>) => (this.facilitygrouptypes = res.body || []));
    });
  }

  updateForm(facilityGroup: IFacilityGroup): void {
    this.editForm.patchValue({
      id: facilityGroup.id,
      name: facilityGroup.name,
      facilityGroupType: facilityGroup.facilityGroupType
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const facilityGroup = this.createFromForm();
    if (facilityGroup.id !== undefined) {
      this.subscribeToSaveResponse(this.facilityGroupService.update(facilityGroup));
    } else {
      this.subscribeToSaveResponse(this.facilityGroupService.create(facilityGroup));
    }
  }

  private createFromForm(): IFacilityGroup {
    return {
      ...new FacilityGroup(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      facilityGroupType: this.editForm.get(['facilityGroupType'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacilityGroup>>): void {
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

  trackById(index: number, item: IFacilityGroupType): any {
    return item.id;
  }
}
