import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IServiceEntryStatusLog } from 'app/shared/model/service-entry-status-log.model';
import { ServiceEntryStatusLogService } from './service-entry-status-log.service';
import { ServiceEntryStatusLogDeleteDialogComponent } from './service-entry-status-log-delete-dialog.component';

@Component({
  selector: 'sys-service-entry-status-log',
  templateUrl: './service-entry-status-log.component.html'
})
export class ServiceEntryStatusLogComponent implements OnInit, OnDestroy {
  serviceEntryStatusLogs?: IServiceEntryStatusLog[];
  eventSubscriber?: Subscription;

  constructor(
    protected serviceEntryStatusLogService: ServiceEntryStatusLogService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.serviceEntryStatusLogService
      .query()
      .subscribe((res: HttpResponse<IServiceEntryStatusLog[]>) => (this.serviceEntryStatusLogs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInServiceEntryStatusLogs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IServiceEntryStatusLog): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInServiceEntryStatusLogs(): void {
    this.eventSubscriber = this.eventManager.subscribe('serviceEntryStatusLogListModification', () => this.loadAll());
  }

  delete(serviceEntryStatusLog: IServiceEntryStatusLog): void {
    const modalRef = this.modalService.open(ServiceEntryStatusLogDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.serviceEntryStatusLog = serviceEntryStatusLog;
  }
}
