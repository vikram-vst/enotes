import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILanguage, Language } from 'app/shared/model/language.model';
import { LanguageService } from './language.service';

@Component({
  selector: 'sys-language-update',
  templateUrl: './language-update.component.html'
})
export class LanguageUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    isoLanguageCode: [],
    name: [null, [Validators.maxLength(25)]]
  });

  constructor(protected languageService: LanguageService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ language }) => {
      this.updateForm(language);
    });
  }

  updateForm(language: ILanguage): void {
    this.editForm.patchValue({
      id: language.id,
      isoLanguageCode: language.isoLanguageCode,
      name: language.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const language = this.createFromForm();
    if (language.id !== undefined) {
      this.subscribeToSaveResponse(this.languageService.update(language));
    } else {
      this.subscribeToSaveResponse(this.languageService.create(language));
    }
  }

  private createFromForm(): ILanguage {
    return {
      ...new Language(),
      id: this.editForm.get(['id'])!.value,
      isoLanguageCode: this.editForm.get(['isoLanguageCode'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILanguage>>): void {
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
