import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IServiceDefinition } from 'app/shared/model/service-definition.model';
import { ServiceDefinitionService } from './service-definition.service';
import { ServiceDefinitionDeleteDialogComponent } from './service-definition-delete-dialog.component';

@Component({
  selector: 'sys-service-definition',
  templateUrl: './service-definition.component.html'
})
export class ServiceDefinitionComponent implements OnInit, OnDestroy {
  serviceDefinitions?: IServiceDefinition[];
  eventSubscriber?: Subscription;

  constructor(
    protected serviceDefinitionService: ServiceDefinitionService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.serviceDefinitionService
      .query()
      .subscribe((res: HttpResponse<IServiceDefinition[]>) => (this.serviceDefinitions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInServiceDefinitions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IServiceDefinition): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInServiceDefinitions(): void {
    this.eventSubscriber = this.eventManager.subscribe('serviceDefinitionListModification', () => this.loadAll());
  }

  delete(serviceDefinition: IServiceDefinition): void {
    const modalRef = this.modalService.open(ServiceDefinitionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.serviceDefinition = serviceDefinition;
  }
}
