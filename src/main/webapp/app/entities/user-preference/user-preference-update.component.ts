import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserPreference, UserPreference } from 'app/shared/model/user-preference.model';
import { UserPreferenceService } from './user-preference.service';
import { IPreference } from 'app/shared/model/preference.model';
import { PreferenceService } from 'app/entities/preference/preference.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IPreference | IUser;

@Component({
  selector: 'sys-user-preference-update',
  templateUrl: './user-preference-update.component.html'
})
export class UserPreferenceUpdateComponent implements OnInit {
  isSaving = false;
  preferences: IPreference[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]],
    description: [null, [Validators.maxLength(100)]],
    preference: [],
    user: []
  });

  constructor(
    protected userPreferenceService: UserPreferenceService,
    protected preferenceService: PreferenceService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userPreference }) => {
      this.updateForm(userPreference);

      this.preferenceService.query().subscribe((res: HttpResponse<IPreference[]>) => (this.preferences = res.body || []));

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(userPreference: IUserPreference): void {
    this.editForm.patchValue({
      id: userPreference.id,
      name: userPreference.name,
      description: userPreference.description,
      preference: userPreference.preference,
      user: userPreference.user
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userPreference = this.createFromForm();
    if (userPreference.id !== undefined) {
      this.subscribeToSaveResponse(this.userPreferenceService.update(userPreference));
    } else {
      this.subscribeToSaveResponse(this.userPreferenceService.create(userPreference));
    }
  }

  private createFromForm(): IUserPreference {
    return {
      ...new UserPreference(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      preference: this.editForm.get(['preference'])!.value,
      user: this.editForm.get(['user'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserPreference>>): void {
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
