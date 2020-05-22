import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGender, Gender } from 'app/shared/model/gender.model';
import { GenderService } from './gender.service';

@Component({
  selector: 'sys-gender-update',
  templateUrl: './gender-update.component.html'
})
export class GenderUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(10)]]
  });

  constructor(protected genderService: GenderService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gender }) => {
      this.updateForm(gender);
    });
  }

  updateForm(gender: IGender): void {
    this.editForm.patchValue({
      id: gender.id,
      name: gender.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const gender = this.createFromForm();
    if (gender.id !== undefined) {
      this.subscribeToSaveResponse(this.genderService.update(gender));
    } else {
      this.subscribeToSaveResponse(this.genderService.create(gender));
    }
  }

  private createFromForm(): IGender {
    return {
      ...new Gender(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGender>>): void {
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
