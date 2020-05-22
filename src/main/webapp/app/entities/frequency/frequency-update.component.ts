import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFrequency, Frequency } from 'app/shared/model/frequency.model';
import { FrequencyService } from './frequency.service';

@Component({
  selector: 'sys-frequency-update',
  templateUrl: './frequency-update.component.html'
})
export class FrequencyUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]],
    description: [null, [Validators.maxLength(60)]]
  });

  constructor(protected frequencyService: FrequencyService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ frequency }) => {
      this.updateForm(frequency);
    });
  }

  updateForm(frequency: IFrequency): void {
    this.editForm.patchValue({
      id: frequency.id,
      name: frequency.name,
      description: frequency.description
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const frequency = this.createFromForm();
    if (frequency.id !== undefined) {
      this.subscribeToSaveResponse(this.frequencyService.update(frequency));
    } else {
      this.subscribeToSaveResponse(this.frequencyService.create(frequency));
    }
  }

  private createFromForm(): IFrequency {
    return {
      ...new Frequency(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFrequency>>): void {
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
