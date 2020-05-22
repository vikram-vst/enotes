import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFacilityUser } from 'app/shared/model/facility-user.model';
import { FacilityUserService } from './facility-user.service';
import { FacilityUserDeleteDialogComponent } from './facility-user-delete-dialog.component';

@Component({
  selector: 'sys-facility-user',
  templateUrl: './facility-user.component.html'
})
export class FacilityUserComponent implements OnInit, OnDestroy {
  facilityUsers?: IFacilityUser[];
  eventSubscriber?: Subscription;

  constructor(
    protected facilityUserService: FacilityUserService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.facilityUserService.query().subscribe((res: HttpResponse<IFacilityUser[]>) => (this.facilityUsers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFacilityUsers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFacilityUser): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFacilityUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe('facilityUserListModification', () => this.loadAll());
  }

  delete(facilityUser: IFacilityUser): void {
    const modalRef = this.modalService.open(FacilityUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.facilityUser = facilityUser;
  }
}
