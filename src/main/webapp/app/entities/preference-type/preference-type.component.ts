import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPreferenceType } from 'app/shared/model/preference-type.model';
import { PreferenceTypeService } from './preference-type.service';
import { PreferenceTypeDeleteDialogComponent } from './preference-type-delete-dialog.component';

@Component({
  selector: 'sys-preference-type',
  templateUrl: './preference-type.component.html'
})
export class PreferenceTypeComponent implements OnInit, OnDestroy {
  preferenceTypes?: IPreferenceType[];
  eventSubscriber?: Subscription;

  constructor(
    protected preferenceTypeService: PreferenceTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.preferenceTypeService.query().subscribe((res: HttpResponse<IPreferenceType[]>) => (this.preferenceTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPreferenceTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPreferenceType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPreferenceTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('preferenceTypeListModification', () => this.loadAll());
  }

  delete(preferenceType: IPreferenceType): void {
    const modalRef = this.modalService.open(PreferenceTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.preferenceType = preferenceType;
  }
}
