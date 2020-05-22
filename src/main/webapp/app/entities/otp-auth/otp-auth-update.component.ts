import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOtpAuth, OtpAuth } from 'app/shared/model/otp-auth.model';
import { OtpAuthService } from './otp-auth.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'sys-otp-auth-update',
  templateUrl: './otp-auth-update.component.html'
})
export class OtpAuthUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    otp: [null, [Validators.maxLength(10)]],
    otpSent: [],
    verificationSuccess: [],
    otpExpired: [],
    otpSentTime: [],
    sentCounter: [],
    failCounter: [],
    otpResetCounter: [],
    maxResend: [],
    maxReset: [],
    maxFailures: [],
    otpActiveTime: [],
    createdDate: [],
    lastModifiedDate: [],
    user: []
  });

  constructor(
    protected otpAuthService: OtpAuthService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ otpAuth }) => {
      if (!otpAuth.id) {
        const today = moment().startOf('day');
        otpAuth.otpSentTime = today;
        otpAuth.createdDate = today;
        otpAuth.lastModifiedDate = today;
      }

      this.updateForm(otpAuth);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(otpAuth: IOtpAuth): void {
    this.editForm.patchValue({
      id: otpAuth.id,
      otp: otpAuth.otp,
      otpSent: otpAuth.otpSent,
      verificationSuccess: otpAuth.verificationSuccess,
      otpExpired: otpAuth.otpExpired,
      otpSentTime: otpAuth.otpSentTime ? otpAuth.otpSentTime.format(DATE_TIME_FORMAT) : null,
      sentCounter: otpAuth.sentCounter,
      failCounter: otpAuth.failCounter,
      otpResetCounter: otpAuth.otpResetCounter,
      maxResend: otpAuth.maxResend,
      maxReset: otpAuth.maxReset,
      maxFailures: otpAuth.maxFailures,
      otpActiveTime: otpAuth.otpActiveTime,
      createdDate: otpAuth.createdDate ? otpAuth.createdDate.format(DATE_TIME_FORMAT) : null,
      lastModifiedDate: otpAuth.lastModifiedDate ? otpAuth.lastModifiedDate.format(DATE_TIME_FORMAT) : null,
      user: otpAuth.user
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const otpAuth = this.createFromForm();
    if (otpAuth.id !== undefined) {
      this.subscribeToSaveResponse(this.otpAuthService.update(otpAuth));
    } else {
      this.subscribeToSaveResponse(this.otpAuthService.create(otpAuth));
    }
  }

  private createFromForm(): IOtpAuth {
    return {
      ...new OtpAuth(),
      id: this.editForm.get(['id'])!.value,
      otp: this.editForm.get(['otp'])!.value,
      otpSent: this.editForm.get(['otpSent'])!.value,
      verificationSuccess: this.editForm.get(['verificationSuccess'])!.value,
      otpExpired: this.editForm.get(['otpExpired'])!.value,
      otpSentTime: this.editForm.get(['otpSentTime'])!.value
        ? moment(this.editForm.get(['otpSentTime'])!.value, DATE_TIME_FORMAT)
        : undefined,
      sentCounter: this.editForm.get(['sentCounter'])!.value,
      failCounter: this.editForm.get(['failCounter'])!.value,
      otpResetCounter: this.editForm.get(['otpResetCounter'])!.value,
      maxResend: this.editForm.get(['maxResend'])!.value,
      maxReset: this.editForm.get(['maxReset'])!.value,
      maxFailures: this.editForm.get(['maxFailures'])!.value,
      otpActiveTime: this.editForm.get(['otpActiveTime'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastModifiedDate: this.editForm.get(['lastModifiedDate'])!.value
        ? moment(this.editForm.get(['lastModifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      user: this.editForm.get(['user'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOtpAuth>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
