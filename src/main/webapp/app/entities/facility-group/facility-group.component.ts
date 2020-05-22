import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFacilityGroup } from 'app/shared/model/facility-group.model';
import { FacilityGroupService } from './facility-group.service';
import { FacilityGroupDeleteDialogComponent } from './facility-group-delete-dialog.component';

@Component({
  selector: 'sys-facility-group',
  templateUrl: './facility-group.component.html'
})
export class FacilityGroupComponent implements OnInit, OnDestroy {
  facilityGroups?: IFacilityGroup[];
  eventSubscriber?: Subscription;

  constructor(
    protected facilityGroupService: FacilityGroupService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.facilityGroupService.query().subscribe((res: HttpResponse<IFacilityGroup[]>) => (this.facilityGroups = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFacilityGroups();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFacilityGroup): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFacilityGroups(): void {
    this.eventSubscriber = this.eventManager.subscribe('facilityGroupListModification', () => this.loadAll());
  }

  delete(facilityGroup: IFacilityGroup): void {
    const modalRef = this.modalService.open(FacilityGroupDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.facilityGroup = facilityGroup;
  }
}
