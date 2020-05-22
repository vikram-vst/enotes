import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IServiceProvider, ServiceProvider } from 'app/shared/model/service-provider.model';
import { ServiceProviderService } from './service-provider.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IService } from 'app/shared/model/service.model';
import { ServiceService } from 'app/entities/service/service.service';

type SelectableEntity = IUser | IService;

@Component({
  selector: 'sys-service-provider-update',
  templateUrl: './service-provider-update.component.html'
})
export class ServiceProviderUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  services: IService[] = [];

  editForm = this.fb.group({
    id: [],
    fromDate: [],
    thruDate: [],
    createdDate: [],
    lastModifiedDate: [],
    user: [],
    service: []
  });

  constructor(
    protected serviceProviderService: ServiceProviderService,
    protected userService: UserService,
    protected serviceService: ServiceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceProvider }) => {
      if (!serviceProvider.id) {
        const today = moment().startOf('day');
        serviceProvider.fromDate = today;
        serviceProvider.thruDate = today;
        serviceProvider.createdDate = today;
        serviceProvider.lastModifiedDate = today;
      }

      this.updateForm(serviceProvider);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.serviceService.query().subscribe((res: HttpResponse<IService[]>) => (this.services = res.body || []));
    });
  }

  updateForm(serviceProvider: IServiceProvider): void {
    this.editForm.patchValue({
      id: serviceProvider.id,
      fromDate: serviceProvider.fromDate ? serviceProvider.fromDate.format(DATE_TIME_FORMAT) : null,
      thruDate: serviceProvider.thruDate ? serviceProvider.thruDate.format(DATE_TIME_FORMAT) : null,
      createdDate: serviceProvider.createdDate ? serviceProvider.createdDate.format(DATE_TIME_FORMAT) : null,
      lastModifiedDate: serviceProvider.lastModifiedDate ? serviceProvider.lastModifiedDate.format(DATE_TIME_FORMAT) : null,
      user: serviceProvider.user,
      service: serviceProvider.service
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const serviceProvider = this.createFromForm();
    if (serviceProvider.id !== undefined) {
      this.subscribeToSaveResponse(this.serviceProviderService.update(serviceProvider));
    } else {
      this.subscribeToSaveResponse(this.serviceProviderService.create(serviceProvider));
    }
  }

  private createFromForm(): IServiceProvider {
    return {
      ...new ServiceProvider(),
      id: this.editForm.get(['id'])!.value,
      fromDate: this.editForm.get(['fromDate'])!.value ? moment(this.editForm.get(['fromDate'])!.value, DATE_TIME_FORMAT) : undefined,
      thruDate: this.editForm.get(['thruDate'])!.value ? moment(this.editForm.get(['thruDate'])!.value, DATE_TIME_FORMAT) : undefined,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastModifiedDate: this.editForm.get(['lastModifiedDate'])!.value
        ? moment(this.editForm.get(['lastModifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      user: this.editForm.get(['user'])!.value,
      service: this.editForm.get(['service'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServiceProvider>>): void {
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
