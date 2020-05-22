import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IServiceFacility } from 'app/shared/model/service-facility.model';
import { ServiceFacilityService } from './service-facility.service';
import { ServiceFacilityDeleteDialogComponent } from './service-facility-delete-dialog.component';

@Component({
  selector: 'sys-service-facility',
  templateUrl: './service-facility.component.html'
})
export class ServiceFacilityComponent implements OnInit, OnDestroy {
  serviceFacilities?: IServiceFacility[];
  eventSubscriber?: Subscription;

  constructor(
    protected serviceFacilityService: ServiceFacilityService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.serviceFacilityService.query().subscribe((res: HttpResponse<IServiceFacility[]>) => (this.serviceFacilities = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInServiceFacilities();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IServiceFacility): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInServiceFacilities(): void {
    this.eventSubscriber = this.eventManager.subscribe('serviceFacilityListModification', () => this.loadAll());
  }

  delete(serviceFacility: IServiceFacility): void {
    const modalRef = this.modalService.open(ServiceFacilityDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.serviceFacility = serviceFacility;
  }
}
