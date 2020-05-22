import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IPerson, Person } from 'app/shared/model/person.model';
import { PersonService } from './person.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IStatus } from 'app/shared/model/status.model';
import { StatusService } from 'app/entities/status/status.service';
import { ILanguage } from 'app/shared/model/language.model';
import { LanguageService } from 'app/entities/language/language.service';
import { IGender } from 'app/shared/model/gender.model';
import { GenderService } from 'app/entities/gender/gender.service';

type SelectableEntity = IUser | IStatus | ILanguage | IGender;

@Component({
  selector: 'sys-person-update',
  templateUrl: './person-update.component.html'
})
export class PersonUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  statuses: IStatus[] = [];
  languages: ILanguage[] = [];
  genders: IGender[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.maxLength(100)]],
    lastName: [null, [Validators.maxLength(100)]],
    displayName: [null, [Validators.maxLength(100)]],
    profilePicture: [],
    profilePictureContentType: [],
    email: [null, [Validators.minLength(5), Validators.maxLength(75)]],
    birthdate: [],
    notes: [null, [Validators.maxLength(255)]],
    mobileNumber: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(14)]],
    createdDate: [],
    lastModifiedDate: [],
    user: [],
    status: [],
    preferredLanguage: [],
    gender: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected personService: PersonService,
    protected userService: UserService,
    protected statusService: StatusService,
    protected languageService: LanguageService,
    protected genderService: GenderService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ person }) => {
      if (!person.id) {
        const today = moment().startOf('day');
        person.birthdate = today;
        person.createdDate = today;
        person.lastModifiedDate = today;
      }

      this.updateForm(person);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.statusService.query().subscribe((res: HttpResponse<IStatus[]>) => (this.statuses = res.body || []));

      this.languageService.query().subscribe((res: HttpResponse<ILanguage[]>) => (this.languages = res.body || []));

      this.genderService.query().subscribe((res: HttpResponse<IGender[]>) => (this.genders = res.body || []));
    });
  }

  updateForm(person: IPerson): void {
    this.editForm.patchValue({
      id: person.id,
      firstName: person.firstName,
      lastName: person.lastName,
      displayName: person.displayName,
      profilePicture: person.profilePicture,
      profilePictureContentType: person.profilePictureContentType,
      email: person.email,
      birthdate: person.birthdate ? person.birthdate.format(DATE_TIME_FORMAT) : null,
      notes: person.notes,
      mobileNumber: person.mobileNumber,
      createdDate: person.createdDate ? person.createdDate.format(DATE_TIME_FORMAT) : null,
      lastModifiedDate: person.lastModifiedDate ? person.lastModifiedDate.format(DATE_TIME_FORMAT) : null,
      user: person.user,
      status: person.status,
      preferredLanguage: person.preferredLanguage,
      gender: person.gender
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

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const person = this.createFromForm();
    if (person.id !== undefined) {
      this.subscribeToSaveResponse(this.personService.update(person));
    } else {
      this.subscribeToSaveResponse(this.personService.create(person));
    }
  }

  private createFromForm(): IPerson {
    return {
      ...new Person(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      displayName: this.editForm.get(['displayName'])!.value,
      profilePictureContentType: this.editForm.get(['profilePictureContentType'])!.value,
      profilePicture: this.editForm.get(['profilePicture'])!.value,
      email: this.editForm.get(['email'])!.value,
      birthdate: this.editForm.get(['birthdate'])!.value ? moment(this.editForm.get(['birthdate'])!.value, DATE_TIME_FORMAT) : undefined,
      notes: this.editForm.get(['notes'])!.value,
      mobileNumber: this.editForm.get(['mobileNumber'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastModifiedDate: this.editForm.get(['lastModifiedDate'])!.value
        ? moment(this.editForm.get(['lastModifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      user: this.editForm.get(['user'])!.value,
      status: this.editForm.get(['status'])!.value,
      preferredLanguage: this.editForm.get(['preferredLanguage'])!.value,
      gender: this.editForm.get(['gender'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPerson>>): void {
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
