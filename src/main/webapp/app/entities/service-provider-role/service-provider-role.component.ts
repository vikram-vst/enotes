import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IServiceProviderRole } from 'app/shared/model/service-provider-role.model';
import { ServiceProviderRoleService } from './service-provider-role.service';
import { ServiceProviderRoleDeleteDialogComponent } from './service-provider-role-delete-dialog.component';

@Component({
  selector: 'sys-service-provider-role',
  templateUrl: './service-provider-role.component.html'
})
export class ServiceProviderRoleComponent implements OnInit, OnDestroy {
  serviceProviderRoles?: IServiceProviderRole[];
  eventSubscriber?: Subscription;

  constructor(
    protected serviceProviderRoleService: ServiceProviderRoleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.serviceProviderRoleService
      .query()
      .subscribe((res: HttpResponse<IServiceProviderRole[]>) => (this.serviceProviderRoles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInServiceProviderRoles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IServiceProviderRole): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInServiceProviderRoles(): void {
    this.eventSubscriber = this.eventManager.subscribe('serviceProviderRoleListModification', () => this.loadAll());
  }

  delete(serviceProviderRole: IServiceProviderRole): void {
    const modalRef = this.modalService.open(ServiceProviderRoleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.serviceProviderRole = serviceProviderRole;
  }
}
