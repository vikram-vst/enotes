import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFacility } from 'app/shared/model/facility.model';
import { FacilityService } from './facility.service';
import { FacilityDeleteDialogComponent } from './facility-delete-dialog.component';

@Component({
  selector: 'sys-facility',
  templateUrl: './facility.component.html'
})
export class FacilityComponent implements OnInit, OnDestroy {
  facilities?: IFacility[];
  eventSubscriber?: Subscription;

  constructor(protected facilityService: FacilityService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.facilityService.query().subscribe((res: HttpResponse<IFacility[]>) => (this.facilities = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFacilities();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFacility): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFacilities(): void {
    this.eventSubscriber = this.eventManager.subscribe('facilityListModification', () => this.loadAll());
  }

  delete(facility: IFacility): void {
    const modalRef = this.modalService.open(FacilityDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.facility = facility;
  }
}
