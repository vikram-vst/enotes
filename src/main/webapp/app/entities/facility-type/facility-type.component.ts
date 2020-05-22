import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFacilityType } from 'app/shared/model/facility-type.model';
import { FacilityTypeService } from './facility-type.service';
import { FacilityTypeDeleteDialogComponent } from './facility-type-delete-dialog.component';

@Component({
  selector: 'sys-facility-type',
  templateUrl: './facility-type.component.html'
})
export class FacilityTypeComponent implements OnInit, OnDestroy {
  facilityTypes?: IFacilityType[];
  eventSubscriber?: Subscription;

  constructor(
    protected facilityTypeService: FacilityTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.facilityTypeService.query().subscribe((res: HttpResponse<IFacilityType[]>) => (this.facilityTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFacilityTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFacilityType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFacilityTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('facilityTypeListModification', () => this.loadAll());
  }

  delete(facilityType: IFacilityType): void {
    const modalRef = this.modalService.open(FacilityTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.facilityType = facilityType;
  }
}
