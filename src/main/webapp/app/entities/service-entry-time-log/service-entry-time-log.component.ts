import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IServiceEntryTimeLog } from 'app/shared/model/service-entry-time-log.model';
import { ServiceEntryTimeLogService } from './service-entry-time-log.service';
import { ServiceEntryTimeLogDeleteDialogComponent } from './service-entry-time-log-delete-dialog.component';

@Component({
  selector: 'sys-service-entry-time-log',
  templateUrl: './service-entry-time-log.component.html'
})
export class ServiceEntryTimeLogComponent implements OnInit, OnDestroy {
  serviceEntryTimeLogs?: IServiceEntryTimeLog[];
  eventSubscriber?: Subscription;

  constructor(
    protected serviceEntryTimeLogService: ServiceEntryTimeLogService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.serviceEntryTimeLogService
      .query()
      .subscribe((res: HttpResponse<IServiceEntryTimeLog[]>) => (this.serviceEntryTimeLogs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInServiceEntryTimeLogs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IServiceEntryTimeLog): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInServiceEntryTimeLogs(): void {
    this.eventSubscriber = this.eventManager.subscribe('serviceEntryTimeLogListModification', () => this.loadAll());
  }

  delete(serviceEntryTimeLog: IServiceEntryTimeLog): void {
    const modalRef = this.modalService.open(ServiceEntryTimeLogDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.serviceEntryTimeLog = serviceEntryTimeLog;
  }
}
