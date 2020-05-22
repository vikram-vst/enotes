import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IServiceProvider } from 'app/shared/model/service-provider.model';
import { ServiceProviderService } from './service-provider.service';
import { ServiceProviderDeleteDialogComponent } from './service-provider-delete-dialog.component';

@Component({
  selector: 'sys-service-provider',
  templateUrl: './service-provider.component.html'
})
export class ServiceProviderComponent implements OnInit, OnDestroy {
  serviceProviders?: IServiceProvider[];
  eventSubscriber?: Subscription;

  constructor(
    protected serviceProviderService: ServiceProviderService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.serviceProviderService.query().subscribe((res: HttpResponse<IServiceProvider[]>) => (this.serviceProviders = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInServiceProviders();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IServiceProvider): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInServiceProviders(): void {
    this.eventSubscriber = this.eventManager.subscribe('serviceProviderListModification', () => this.loadAll());
  }

  delete(serviceProvider: IServiceProvider): void {
    const modalRef = this.modalService.open(ServiceProviderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.serviceProvider = serviceProvider;
  }
}
