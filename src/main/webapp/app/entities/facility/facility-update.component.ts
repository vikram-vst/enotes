import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFacility, Facility } from 'app/shared/model/facility.model';
import { FacilityService } from './facility.service';
import { IFacilityType } from 'app/shared/model/facility-type.model';
import { FacilityTypeService } from 'app/entities/facility-type/facility-type.service';
import { IProductStore } from 'app/shared/model/product-store.model';
import { ProductStoreService } from 'app/entities/product-store/product-store.service';
import { IFacilityGroup } from 'app/shared/model/facility-group.model';
import { FacilityGroupService } from 'app/entities/facility-group/facility-group.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IFacilityType | IProductStore | IFacilityGroup | IUser;

@Component({
  selector: 'sys-facility-update',
  templateUrl: './facility-update.component.html'
})
export class FacilityUpdateComponent implements OnInit {
  isSaving = false;
  facilitytypes: IFacilityType[] = [];
  productstores: IProductStore[] = [];
  facilitygroups: IFacilityGroup[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]],
    description: [null, [Validators.maxLength(60)]],
    facilityType: [],
    productStore: [],
    facilityGroup: [],
    owner: []
  });

  constructor(
    protected facilityService: FacilityService,
    protected facilityTypeService: FacilityTypeService,
    protected productStoreService: ProductStoreService,
    protected facilityGroupService: FacilityGroupService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facility }) => {
      this.updateForm(facility);

      this.facilityTypeService.query().subscribe((res: HttpResponse<IFacilityType[]>) => (this.facilitytypes = res.body || []));

      this.productStoreService.query().subscribe((res: HttpResponse<IProductStore[]>) => (this.productstores = res.body || []));

      this.facilityGroupService.query().subscribe((res: HttpResponse<IFacilityGroup[]>) => (this.facilitygroups = res.body || []));

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(facility: IFacility): void {
    this.editForm.patchValue({
      id: facility.id,
      name: facility.name,
      description: facility.description,
      facilityType: facility.facilityType,
      productStore: facility.productStore,
      facilityGroup: facility.facilityGroup,
      owner: facility.owner
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const facility = this.createFromForm();
    if (facility.id !== undefined) {
      this.subscribeToSaveResponse(this.facilityService.update(facility));
    } else {
      this.subscribeToSaveResponse(this.facilityService.create(facility));
    }
  }

  private createFromForm(): IFacility {
    return {
      ...new Facility(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      facilityType: this.editForm.get(['facilityType'])!.value,
      productStore: this.editForm.get(['productStore'])!.value,
      facilityGroup: this.editForm.get(['facilityGroup'])!.value,
      owner: this.editForm.get(['owner'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacility>>): void {
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
