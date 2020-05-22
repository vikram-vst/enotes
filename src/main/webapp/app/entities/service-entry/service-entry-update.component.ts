import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IServiceEntry, ServiceEntry } from 'app/shared/model/service-entry.model';
import { ServiceEntryService } from './service-entry.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IStatus } from 'app/shared/model/status.model';
import { StatusService } from 'app/entities/status/status.service';
import { IServiceDefinition } from 'app/shared/model/service-definition.model';
import { ServiceDefinitionService } from 'app/entities/service-definition/service-definition.service';
import { IGeoPoint } from 'app/shared/model/geo-point.model';
import { GeoPointService } from 'app/entities/geo-point/geo-point.service';
import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from 'app/entities/address/address.service';

type SelectableEntity = IUser | IStatus | IServiceDefinition | IGeoPoint | IAddress;

@Component({
  selector: 'sys-service-entry-update',
  templateUrl: './service-entry-update.component.html'
})
export class ServiceEntryUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  statuses: IStatus[] = [];
  servicedefinitions: IServiceDefinition[] = [];
  geopoints: IGeoPoint[] = [];
  addresses: IAddress[] = [];

  editForm = this.fb.group({
    id: [],
    createdDate: [],
    initiatedDate: [],
    lastModifiedDate: [],
    serviceStartDate: [],
    serviceEndDate: [],
    entry: [],
    user: [],
    status: [],
    serviceDefinition: [null, Validators.required],
    geoPoint: [],
    address: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected serviceEntryService: ServiceEntryService,
    protected userService: UserService,
    protected statusService: StatusService,
    protected serviceDefinitionService: ServiceDefinitionService,
    protected geoPointService: GeoPointService,
    protected addressService: AddressService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceEntry }) => {
      if (!serviceEntry.id) {
        const today = moment().startOf('day');
        serviceEntry.createdDate = today;
        serviceEntry.initiatedDate = today;
        serviceEntry.lastModifiedDate = today;
        serviceEntry.serviceStartDate = today;
        serviceEntry.serviceEndDate = today;
      }

      this.updateForm(serviceEntry);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.statusService.query().subscribe((res: HttpResponse<IStatus[]>) => (this.statuses = res.body || []));

      this.serviceDefinitionService
        .query()
        .subscribe((res: HttpResponse<IServiceDefinition[]>) => (this.servicedefinitions = res.body || []));

      this.geoPointService.query().subscribe((res: HttpResponse<IGeoPoint[]>) => (this.geopoints = res.body || []));

      this.addressService.query().subscribe((res: HttpResponse<IAddress[]>) => (this.addresses = res.body || []));
    });
  }

  updateForm(serviceEntry: IServiceEntry): void {
    this.editForm.patchValue({
      id: serviceEntry.id,
      createdDate: serviceEntry.createdDate ? serviceEntry.createdDate.format(DATE_TIME_FORMAT) : null,
      initiatedDate: serviceEntry.initiatedDate ? serviceEntry.initiatedDate.format(DATE_TIME_FORMAT) : null,
      lastModifiedDate: serviceEntry.lastModifiedDate ? serviceEntry.lastModifiedDate.format(DATE_TIME_FORMAT) : null,
      serviceStartDate: serviceEntry.serviceStartDate ? serviceEntry.serviceStartDate.format(DATE_TIME_FORMAT) : null,
      serviceEndDate: serviceEntry.serviceEndDate ? serviceEntry.serviceEndDate.format(DATE_TIME_FORMAT) : null,
      entry: serviceEntry.entry,
      user: serviceEntry.user,
      status: serviceEntry.status,
      serviceDefinition: serviceEntry.serviceDefinition,
      geoPoint: serviceEntry.geoPoint,
      address: serviceEntry.address
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('enotesApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const serviceEntry = this.createFromForm();
    if (serviceEntry.id !== undefined) {
      this.subscribeToSaveResponse(this.serviceEntryService.update(serviceEntry));
    } else {
      this.subscribeToSaveResponse(this.serviceEntryService.create(serviceEntry));
    }
  }

  private createFromForm(): IServiceEntry {
    return {
      ...new ServiceEntry(),
      id: this.editForm.get(['id'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      initiatedDate: this.editForm.get(['initiatedDate'])!.value
        ? moment(this.editForm.get(['initiatedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastModifiedDate: this.editForm.get(['lastModifiedDate'])!.value
        ? moment(this.editForm.get(['lastModifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      serviceStartDate: this.editForm.get(['serviceStartDate'])!.value
        ? moment(this.editForm.get(['serviceStartDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      serviceEndDate: this.editForm.get(['serviceEndDate'])!.value
        ? moment(this.editForm.get(['serviceEndDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      entry: this.editForm.get(['entry'])!.value,
      user: this.editForm.get(['user'])!.value,
      status: this.editForm.get(['status'])!.value,
      serviceDefinition: this.editForm.get(['serviceDefinition'])!.value,
      geoPoint: this.editForm.get(['geoPoint'])!.value,
      address: this.editForm.get(['address'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServiceEntry>>): void {
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
