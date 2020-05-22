import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IStatusCategory, StatusCategory } from 'app/shared/model/status-category.model';
import { StatusCategoryService } from './status-category.service';

@Component({
  selector: 'sys-status-category-update',
  templateUrl: './status-category-update.component.html'
})
export class StatusCategoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]],
    description: [null, [Validators.maxLength(100)]]
  });

  constructor(protected statusCategoryService: StatusCategoryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ statusCategory }) => {
      this.updateForm(statusCategory);
    });
  }

  updateForm(statusCategory: IStatusCategory): void {
    this.editForm.patchValue({
      id: statusCategory.id,
      name: statusCategory.name,
      description: statusCategory.description
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const statusCategory = this.createFromForm();
    if (statusCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.statusCategoryService.update(statusCategory));
    } else {
      this.subscribeToSaveResponse(this.statusCategoryService.create(statusCategory));
    }
  }

  private createFromForm(): IStatusCategory {
    return {
      ...new StatusCategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStatusCategory>>): void {
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
