import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IServiceEntry } from 'app/shared/model/service-entry.model';
import { ServiceEntryService } from './service-entry.service';
import { ServiceEntryDeleteDialogComponent } from './service-entry-delete-dialog.component';

@Component({
  selector: 'sys-service-entry',
  templateUrl: './service-entry.component.html'
})
export class ServiceEntryComponent implements OnInit, OnDestroy {
  serviceEntries?: IServiceEntry[];
  eventSubscriber?: Subscription;

  constructor(
    protected serviceEntryService: ServiceEntryService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.serviceEntryService.query().subscribe((res: HttpResponse<IServiceEntry[]>) => (this.serviceEntries = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInServiceEntries();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IServiceEntry): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInServiceEntries(): void {
    this.eventSubscriber = this.eventManager.subscribe('serviceEntryListModification', () => this.loadAll());
  }

  delete(serviceEntry: IServiceEntry): void {
    const modalRef = this.modalService.open(ServiceEntryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.serviceEntry = serviceEntry;
  }
}
