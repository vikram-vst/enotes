import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFacilityUser, FacilityUser } from 'app/shared/model/facility-user.model';
import { FacilityUserService } from './facility-user.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IFacility } from 'app/shared/model/facility.model';
import { FacilityService } from 'app/entities/facility/facility.service';

type SelectableEntity = IUser | IFacility;

@Component({
  selector: 'sys-facility-user-update',
  templateUrl: './facility-user-update.component.html'
})
export class FacilityUserUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  facilities: IFacility[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]],
    user: [],
    facility: []
  });

  constructor(
    protected facilityUserService: FacilityUserService,
    protected userService: UserService,
    protected facilityService: FacilityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facilityUser }) => {
      this.updateForm(facilityUser);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.facilityService.query().subscribe((res: HttpResponse<IFacility[]>) => (this.facilities = res.body || []));
    });
  }

  updateForm(facilityUser: IFacilityUser): void {
    this.editForm.patchValue({
      id: facilityUser.id,
      name: facilityUser.name,
      user: facilityUser.user,
      facility: facilityUser.facility
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const facilityUser = this.createFromForm();
    if (facilityUser.id !== undefined) {
      this.subscribeToSaveResponse(this.facilityUserService.update(facilityUser));
    } else {
      this.subscribeToSaveResponse(this.facilityUserService.create(facilityUser));
    }
  }

  private createFromForm(): IFacilityUser {
    return {
      ...new FacilityUser(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      user: this.editForm.get(['user'])!.value,
      facility: this.editForm.get(['facility'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacilityUser>>): void {
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
