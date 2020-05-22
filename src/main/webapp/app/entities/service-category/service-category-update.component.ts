import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IServiceCategory, ServiceCategory } from 'app/shared/model/service-category.model';
import { ServiceCategoryService } from './service-category.service';

@Component({
  selector: 'sys-service-category-update',
  templateUrl: './service-category-update.component.html'
})
export class ServiceCategoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.maxLength(25)]],
    sequenceNo: [],
    parentCategory: [],
    imagePath: [],
    createdDate: [],
    lastModifiedDate: []
  });

  constructor(
    protected serviceCategoryService: ServiceCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceCategory }) => {
      if (!serviceCategory.id) {
        const today = moment().startOf('day');
        serviceCategory.createdDate = today;
        serviceCategory.lastModifiedDate = today;
      }

      this.updateForm(serviceCategory);
    });
  }

  updateForm(serviceCategory: IServiceCategory): void {
    this.editForm.patchValue({
      id: serviceCategory.id,
      title: serviceCategory.title,
      sequenceNo: serviceCategory.sequenceNo,
      parentCategory: serviceCategory.parentCategory,
      imagePath: serviceCategory.imagePath,
      createdDate: serviceCategory.createdDate ? serviceCategory.createdDate.format(DATE_TIME_FORMAT) : null,
      lastModifiedDate: serviceCategory.lastModifiedDate ? serviceCategory.lastModifiedDate.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const serviceCategory = this.createFromForm();
    if (serviceCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.serviceCategoryService.update(serviceCategory));
    } else {
      this.subscribeToSaveResponse(this.serviceCategoryService.create(serviceCategory));
    }
  }

  private createFromForm(): IServiceCategory {
    return {
      ...new ServiceCategory(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      sequenceNo: this.editForm.get(['sequenceNo'])!.value,
      parentCategory: this.editForm.get(['parentCategory'])!.value,
      imagePath: this.editForm.get(['imagePath'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastModifiedDate: this.editForm.get(['lastModifiedDate'])!.value
        ? moment(this.editForm.get(['lastModifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServiceCategory>>): void {
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
