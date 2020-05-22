import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IService, Service } from 'app/shared/model/service.model';
import { ServiceService } from './service.service';
import { IServiceCategory } from 'app/shared/model/service-category.model';
import { ServiceCategoryService } from 'app/entities/service-category/service-category.service';
import { IFrequency } from 'app/shared/model/frequency.model';
import { FrequencyService } from 'app/entities/frequency/frequency.service';

type SelectableEntity = IServiceCategory | IFrequency;

@Component({
  selector: 'sys-service-update',
  templateUrl: './service-update.component.html'
})
export class ServiceUpdateComponent implements OnInit {
  isSaving = false;
  servicecategories: IServiceCategory[] = [];
  frequencies: IFrequency[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.maxLength(25)]],
    sequenceNo: [],
    startTime: [],
    endTime: [],
    startDate: [],
    endDate: [],
    recurrence: [],
    interval: [],
    gracePeriod: [],
    imagePath: [],
    createdDate: [],
    lastModifiedDate: [],
    category: [],
    frequency: []
  });

  constructor(
    protected serviceService: ServiceService,
    protected serviceCategoryService: ServiceCategoryService,
    protected frequencyService: FrequencyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ service }) => {
      if (!service.id) {
        const today = moment().startOf('day');
        service.startDate = today;
        service.endDate = today;
        service.createdDate = today;
        service.lastModifiedDate = today;
      }

      this.updateForm(service);

      this.serviceCategoryService.query().subscribe((res: HttpResponse<IServiceCategory[]>) => (this.servicecategories = res.body || []));

      this.frequencyService.query().subscribe((res: HttpResponse<IFrequency[]>) => (this.frequencies = res.body || []));
    });
  }

  updateForm(service: IService): void {
    this.editForm.patchValue({
      id: service.id,
      title: service.title,
      sequenceNo: service.sequenceNo,
      startTime: service.startTime,
      endTime: service.endTime,
      startDate: service.startDate ? service.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: service.endDate ? service.endDate.format(DATE_TIME_FORMAT) : null,
      recurrence: service.recurrence,
      interval: service.interval,
      gracePeriod: service.gracePeriod,
      imagePath: service.imagePath,
      createdDate: service.createdDate ? service.createdDate.format(DATE_TIME_FORMAT) : null,
      lastModifiedDate: service.lastModifiedDate ? service.lastModifiedDate.format(DATE_TIME_FORMAT) : null,
      category: service.category,
      frequency: service.frequency
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const service = this.createFromForm();
    if (service.id !== undefined) {
      this.subscribeToSaveResponse(this.serviceService.update(service));
    } else {
      this.subscribeToSaveResponse(this.serviceService.create(service));
    }
  }

  private createFromForm(): IService {
    return {
      ...new Service(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      sequenceNo: this.editForm.get(['sequenceNo'])!.value,
      startTime: this.editForm.get(['startTime'])!.value,
      endTime: this.editForm.get(['endTime'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      recurrence: this.editForm.get(['recurrence'])!.value,
      interval: this.editForm.get(['interval'])!.value,
      gracePeriod: this.editForm.get(['gracePeriod'])!.value,
      imagePath: this.editForm.get(['imagePath'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastModifiedDate: this.editForm.get(['lastModifiedDate'])!.value
        ? moment(this.editForm.get(['lastModifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      category: this.editForm.get(['category'])!.value,
      frequency: this.editForm.get(['frequency'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IService>>): void {
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
