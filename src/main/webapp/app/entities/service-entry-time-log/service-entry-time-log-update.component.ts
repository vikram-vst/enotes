import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IServiceEntryTimeLog, ServiceEntryTimeLog } from 'app/shared/model/service-entry-time-log.model';
import { ServiceEntryTimeLogService } from './service-entry-time-log.service';
import { IServiceEntry } from 'app/shared/model/service-entry.model';
import { ServiceEntryService } from 'app/entities/service-entry/service-entry.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IServiceEntry | IUser;

@Component({
  selector: 'sys-service-entry-time-log-update',
  templateUrl: './service-entry-time-log-update.component.html'
})
export class ServiceEntryTimeLogUpdateComponent implements OnInit {
  isSaving = false;
  serviceentries: IServiceEntry[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    createdDate: [],
    lastModifiedDate: [],
    serviceEntry: [],
    modifiedBy: [],
    createdBy: []
  });

  constructor(
    protected serviceEntryTimeLogService: ServiceEntryTimeLogService,
    protected serviceEntryService: ServiceEntryService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceEntryTimeLog }) => {
      if (!serviceEntryTimeLog.id) {
        const today = moment().startOf('day');
        serviceEntryTimeLog.createdDate = today;
        serviceEntryTimeLog.lastModifiedDate = today;
      }

      this.updateForm(serviceEntryTimeLog);

      this.serviceEntryService.query().subscribe((res: HttpResponse<IServiceEntry[]>) => (this.serviceentries = res.body || []));

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(serviceEntryTimeLog: IServiceEntryTimeLog): void {
    this.editForm.patchValue({
      id: serviceEntryTimeLog.id,
      createdDate: serviceEntryTimeLog.createdDate ? serviceEntryTimeLog.createdDate.format(DATE_TIME_FORMAT) : null,
      lastModifiedDate: serviceEntryTimeLog.lastModifiedDate ? serviceEntryTimeLog.lastModifiedDate.format(DATE_TIME_FORMAT) : null,
      serviceEntry: serviceEntryTimeLog.serviceEntry,
      modifiedBy: serviceEntryTimeLog.modifiedBy,
      createdBy: serviceEntryTimeLog.createdBy
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const serviceEntryTimeLog = this.createFromForm();
    if (serviceEntryTimeLog.id !== undefined) {
      this.subscribeToSaveResponse(this.serviceEntryTimeLogService.update(serviceEntryTimeLog));
    } else {
      this.subscribeToSaveResponse(this.serviceEntryTimeLogService.create(serviceEntryTimeLog));
    }
  }

  private createFromForm(): IServiceEntryTimeLog {
    return {
      ...new ServiceEntryTimeLog(),
      id: this.editForm.get(['id'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastModifiedDate: this.editForm.get(['lastModifiedDate'])!.value
        ? moment(this.editForm.get(['lastModifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      serviceEntry: this.editForm.get(['serviceEntry'])!.value,
      modifiedBy: this.editForm.get(['modifiedBy'])!.value,
      createdBy: this.editForm.get(['createdBy'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServiceEntryTimeLog>>): void {
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
