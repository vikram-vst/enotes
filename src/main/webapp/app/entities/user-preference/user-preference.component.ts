import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserPreference } from 'app/shared/model/user-preference.model';
import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceDeleteDialogComponent } from './user-preference-delete-dialog.component';

@Component({
  selector: 'sys-user-preference',
  templateUrl: './user-preference.component.html'
})
export class UserPreferenceComponent implements OnInit, OnDestroy {
  userPreferences?: IUserPreference[];
  eventSubscriber?: Subscription;

  constructor(
    protected userPreferenceService: UserPreferenceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.userPreferenceService.query().subscribe((res: HttpResponse<IUserPreference[]>) => (this.userPreferences = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserPreferences();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserPreference): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserPreferences(): void {
    this.eventSubscriber = this.eventManager.subscribe('userPreferenceListModification', () => this.loadAll());
  }

  delete(userPreference: IUserPreference): void {
    const modalRef = this.modalService.open(UserPreferenceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userPreference = userPreference;
  }
}
