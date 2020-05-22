import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPreference } from 'app/shared/model/preference.model';
import { PreferenceService } from './preference.service';
import { PreferenceDeleteDialogComponent } from './preference-delete-dialog.component';

@Component({
  selector: 'sys-preference',
  templateUrl: './preference.component.html'
})
export class PreferenceComponent implements OnInit, OnDestroy {
  preferences?: IPreference[];
  eventSubscriber?: Subscription;

  constructor(protected preferenceService: PreferenceService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.preferenceService.query().subscribe((res: HttpResponse<IPreference[]>) => (this.preferences = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPreferences();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPreference): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPreferences(): void {
    this.eventSubscriber = this.eventManager.subscribe('preferenceListModification', () => this.loadAll());
  }

  delete(preference: IPreference): void {
    const modalRef = this.modalService.open(PreferenceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.preference = preference;
  }
}
