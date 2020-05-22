import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFacilityGroupType } from 'app/shared/model/facility-group-type.model';
import { FacilityGroupTypeService } from './facility-group-type.service';
import { FacilityGroupTypeDeleteDialogComponent } from './facility-group-type-delete-dialog.component';

@Component({
  selector: 'sys-facility-group-type',
  templateUrl: './facility-group-type.component.html'
})
export class FacilityGroupTypeComponent implements OnInit, OnDestroy {
  facilityGroupTypes?: IFacilityGroupType[];
  eventSubscriber?: Subscription;

  constructor(
    protected facilityGroupTypeService: FacilityGroupTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.facilityGroupTypeService
      .query()
      .subscribe((res: HttpResponse<IFacilityGroupType[]>) => (this.facilityGroupTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFacilityGroupTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFacilityGroupType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFacilityGroupTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('facilityGroupTypeListModification', () => this.loadAll());
  }

  delete(facilityGroupType: IFacilityGroupType): void {
    const modalRef = this.modalService.open(FacilityGroupTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.facilityGroupType = facilityGroupType;
  }
}
