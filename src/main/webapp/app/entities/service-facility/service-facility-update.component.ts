import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IServiceFacility, ServiceFacility } from 'app/shared/model/service-facility.model';
import { ServiceFacilityService } from './service-facility.service';
import { IFrequency } from 'app/shared/model/frequency.model';
import { FrequencyService } from 'app/entities/frequency/frequency.service';

@Component({
  selector: 'sys-service-facility-update',
  templateUrl: './service-facility-update.component.html'
})
export class ServiceFacilityUpdateComponent implements OnInit {
  isSaving = false;
  frequencies: IFrequency[] = [];

  editForm = this.fb.group({
    id: [],
    fromDate: [],
    thruDate: [],
    startTime: [],
    endTime: [],
    startDate: [],
    endDate: [],
    recurrence: [],
    interval: [],
    gracePeriod: [],
    createdDate: [],
    lastModifiedDate: [],
    frequency: []
  });

  constructor(
    protected serviceFacilityService: ServiceFacilityService,
    protected frequencyService: FrequencyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceFacility }) => {
      if (!serviceFacility.id) {
        const today = moment().startOf('day');
        serviceFacility.fromDate = today;
        serviceFacility.thruDate = today;
        serviceFacility.startDate = today;
        serviceFacility.endDate = today;
        serviceFacility.createdDate = today;
        serviceFacility.lastModifiedDate = today;
      }

      this.updateForm(serviceFacility);

      this.frequencyService.query().subscribe((res: HttpResponse<IFrequency[]>) => (this.frequencies = res.body || []));
    });
  }

  updateForm(serviceFacility: IServiceFacility): void {
    this.editForm.patchValue({
      id: serviceFacility.id,
      fromDate: serviceFacility.fromDate ? serviceFacility.fromDate.format(DATE_TIME_FORMAT) : null,
      thruDate: serviceFacility.thruDate ? serviceFacility.thruDate.format(DATE_TIME_FORMAT) : null,
      startTime: serviceFacility.startTime,
      endTime: serviceFacility.endTime,
      startDate: serviceFacility.startDate ? serviceFacility.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: serviceFacility.endDate ? serviceFacility.endDate.format(DATE_TIME_FORMAT) : null,
      recurrence: serviceFacility.recurrence,
      interval: serviceFacility.interval,
      gracePeriod: serviceFacility.gracePeriod,
      createdDate: serviceFacility.createdDate ? serviceFacility.createdDate.format(DATE_TIME_FORMAT) : null,
      lastModifiedDate: serviceFacility.lastModifiedDate ? serviceFacility.lastModifiedDate.format(DATE_TIME_FORMAT) : null,
      frequency: serviceFacility.frequency
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const serviceFacility = this.createFromForm();
    if (serviceFacility.id !== undefined) {
      this.subscribeToSaveResponse(this.serviceFacilityService.update(serviceFacility));
    } else {
      this.subscribeToSaveResponse(this.serviceFacilityService.create(serviceFacility));
    }
  }

  private createFromForm(): IServiceFacility {
    return {
      ...new ServiceFacility(),
      id: this.editForm.get(['id'])!.value,
      fromDate: this.editForm.get(['fromDate'])!.value ? moment(this.editForm.get(['fromDate'])!.value, DATE_TIME_FORMAT) : undefined,
      thruDate: this.editForm.get(['thruDate'])!.value ? moment(this.editForm.get(['thruDate'])!.value, DATE_TIME_FORMAT) : undefined,
      startTime: this.editForm.get(['startTime'])!.value,
      endTime: this.editForm.get(['endTime'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      recurrence: this.editForm.get(['recurrence'])!.value,
      interval: this.editForm.get(['interval'])!.value,
      gracePeriod: this.editForm.get(['gracePeriod'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastModifiedDate: this.editForm.get(['lastModifiedDate'])!.value
        ? moment(this.editForm.get(['lastModifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      frequency: this.editForm.get(['frequency'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServiceFacility>>): void {
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

  trackById(index: number, item: IFrequency): any {
    return item.id;
  }
}
