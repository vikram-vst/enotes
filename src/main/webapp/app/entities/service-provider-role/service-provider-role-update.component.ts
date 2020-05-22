import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IServiceProviderRole, ServiceProviderRole } from 'app/shared/model/service-provider-role.model';
import { ServiceProviderRoleService } from './service-provider-role.service';

@Component({
  selector: 'sys-service-provider-role-update',
  templateUrl: './service-provider-role-update.component.html'
})
export class ServiceProviderRoleUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]],
    createdDate: [],
    lastModifiedDate: []
  });

  constructor(
    protected serviceProviderRoleService: ServiceProviderRoleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceProviderRole }) => {
      if (!serviceProviderRole.id) {
        const today = moment().startOf('day');
        serviceProviderRole.createdDate = today;
        serviceProviderRole.lastModifiedDate = today;
      }

      this.updateForm(serviceProviderRole);
    });
  }

  updateForm(serviceProviderRole: IServiceProviderRole): void {
    this.editForm.patchValue({
      id: serviceProviderRole.id,
      name: serviceProviderRole.name,
      createdDate: serviceProviderRole.createdDate ? serviceProviderRole.createdDate.format(DATE_TIME_FORMAT) : null,
      lastModifiedDate: serviceProviderRole.lastModifiedDate ? serviceProviderRole.lastModifiedDate.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const serviceProviderRole = this.createFromForm();
    if (serviceProviderRole.id !== undefined) {
      this.subscribeToSaveResponse(this.serviceProviderRoleService.update(serviceProviderRole));
    } else {
      this.subscribeToSaveResponse(this.serviceProviderRoleService.create(serviceProviderRole));
    }
  }

  private createFromForm(): IServiceProviderRole {
    return {
      ...new ServiceProviderRole(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastModifiedDate: this.editForm.get(['lastModifiedDate'])!.value
        ? moment(this.editForm.get(['lastModifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServiceProviderRole>>): void {
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
}
