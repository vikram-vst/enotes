import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IStatus, Status } from 'app/shared/model/status.model';
import { StatusService } from './status.service';
import { IStatusCategory } from 'app/shared/model/status-category.model';
import { StatusCategoryService } from 'app/entities/status-category/status-category.service';

@Component({
  selector: 'sys-status-update',
  templateUrl: './status-update.component.html'
})
export class StatusUpdateComponent implements OnInit {
  isSaving = false;
  statuscategories: IStatusCategory[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]],
    sequenceNo: [],
    description: [null, [Validators.maxLength(100)]],
    type: [null, [Validators.maxLength(25)]],
    category: []
  });

  constructor(
    protected statusService: StatusService,
    protected statusCategoryService: StatusCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ status }) => {
      this.updateForm(status);

      this.statusCategoryService.query().subscribe((res: HttpResponse<IStatusCategory[]>) => (this.statuscategories = res.body || []));
    });
  }

  updateForm(status: IStatus): void {
    this.editForm.patchValue({
      id: status.id,
      name: status.name,
      sequenceNo: status.sequenceNo,
      description: status.description,
      type: status.type,
      category: status.category
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const status = this.createFromForm();
    if (status.id !== undefined) {
      this.subscribeToSaveResponse(this.statusService.update(status));
    } else {
      this.subscribeToSaveResponse(this.statusService.create(status));
    }
  }

  private createFromForm(): IStatus {
    return {
      ...new Status(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      sequenceNo: this.editForm.get(['sequenceNo'])!.value,
      description: this.editForm.get(['description'])!.value,
      type: this.editForm.get(['type'])!.value,
      category: this.editForm.get(['category'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStatus>>): void {
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

  trackById(index: number, item: IStatusCategory): any {
    return item.id;
  }
}
