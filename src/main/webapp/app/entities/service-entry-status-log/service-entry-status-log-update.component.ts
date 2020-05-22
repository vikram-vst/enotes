import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IServiceEntryStatusLog, ServiceEntryStatusLog } from 'app/shared/model/service-entry-status-log.model';
import { ServiceEntryStatusLogService } from './service-entry-status-log.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'sys-service-entry-status-log-update',
  templateUrl: './service-entry-status-log-update.component.html'
})
export class ServiceEntryStatusLogUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    createdDate: [],
    modifiedBy: []
  });

  constructor(
    protected serviceEntryStatusLogService: ServiceEntryStatusLogService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceEntryStatusLog }) => {
      if (!serviceEntryStatusLog.id) {
        const today = moment().startOf('day');
        serviceEntryStatusLog.createdDate = today;
      }

      this.updateForm(serviceEntryStatusLog);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(serviceEntryStatusLog: IServiceEntryStatusLog): void {
    this.editForm.patchValue({
      id: serviceEntryStatusLog.id,
      createdDate: serviceEntryStatusLog.createdDate ? serviceEntryStatusLog.createdDate.format(DATE_TIME_FORMAT) : null,
      modifiedBy: serviceEntryStatusLog.modifiedBy
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const serviceEntryStatusLog = this.createFromForm();
    if (serviceEntryStatusLog.id !== undefined) {
      this.subscribeToSaveResponse(this.serviceEntryStatusLogService.update(serviceEntryStatusLog));
    } else {
      this.subscribeToSaveResponse(this.serviceEntryStatusLogService.create(serviceEntryStatusLog));
    }
  }

  private createFromForm(): IServiceEntryStatusLog {
    return {
      ...new ServiceEntryStatusLog(),
      id: this.editForm.get(['id'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      modifiedBy: this.editForm.get(['modifiedBy'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServiceEntryStatusLog>>): void {
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
