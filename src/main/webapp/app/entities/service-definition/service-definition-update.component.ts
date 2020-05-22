import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IServiceDefinition, ServiceDefinition } from 'app/shared/model/service-definition.model';
import { ServiceDefinitionService } from './service-definition.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IStatus } from 'app/shared/model/status.model';
import { StatusService } from 'app/entities/status/status.service';
import { IService } from 'app/shared/model/service.model';
import { ServiceService } from 'app/entities/service/service.service';

type SelectableEntity = IStatus | IService;

@Component({
  selector: 'sys-service-definition-update',
  templateUrl: './service-definition-update.component.html'
})
export class ServiceDefinitionUpdateComponent implements OnInit {
  isSaving = false;
  statuses: IStatus[] = [];
  services: IService[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.maxLength(25)]],
    version: [null, [Validators.min(1), Validators.max(100)]],
    imagePath: [],
    createdDate: [],
    lastModifiedDate: [],
    fields: [],
    status: [],
    service: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected serviceDefinitionService: ServiceDefinitionService,
    protected statusService: StatusService,
    protected serviceService: ServiceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceDefinition }) => {
      if (!serviceDefinition.id) {
        const today = moment().startOf('day');
        serviceDefinition.createdDate = today;
        serviceDefinition.lastModifiedDate = today;
      }

      this.updateForm(serviceDefinition);

      this.statusService.query().subscribe((res: HttpResponse<IStatus[]>) => (this.statuses = res.body || []));

      this.serviceService.query().subscribe((res: HttpResponse<IService[]>) => (this.services = res.body || []));
    });
  }

  updateForm(serviceDefinition: IServiceDefinition): void {
    this.editForm.patchValue({
      id: serviceDefinition.id,
      title: serviceDefinition.title,
      version: serviceDefinition.version,
      imagePath: serviceDefinition.imagePath,
      createdDate: serviceDefinition.createdDate ? serviceDefinition.createdDate.format(DATE_TIME_FORMAT) : null,
      lastModifiedDate: serviceDefinition.lastModifiedDate ? serviceDefinition.lastModifiedDate.format(DATE_TIME_FORMAT) : null,
      fields: serviceDefinition.fields,
      status: serviceDefinition.status,
      service: serviceDefinition.service
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
    const serviceDefinition = this.createFromForm();
    if (serviceDefinition.id !== undefined) {
      this.subscribeToSaveResponse(this.serviceDefinitionService.update(serviceDefinition));
    } else {
      this.subscribeToSaveResponse(this.serviceDefinitionService.create(serviceDefinition));
    }
  }

  private createFromForm(): IServiceDefinition {
    return {
      ...new ServiceDefinition(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      version: this.editForm.get(['version'])!.value,
      imagePath: this.editForm.get(['imagePath'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastModifiedDate: this.editForm.get(['lastModifiedDate'])!.value
        ? moment(this.editForm.get(['lastModifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      fields: this.editForm.get(['fields'])!.value,
      status: this.editForm.get(['status'])!.value,
      service: this.editForm.get(['service'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServiceDefinition>>): void {
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
