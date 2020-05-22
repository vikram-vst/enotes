import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IServiceCategory } from 'app/shared/model/service-category.model';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryDeleteDialogComponent } from './service-category-delete-dialog.component';

@Component({
  selector: 'sys-service-category',
  templateUrl: './service-category.component.html'
})
export class ServiceCategoryComponent implements OnInit, OnDestroy {
  serviceCategories?: IServiceCategory[];
  eventSubscriber?: Subscription;

  constructor(
    protected serviceCategoryService: ServiceCategoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.serviceCategoryService.query().subscribe((res: HttpResponse<IServiceCategory[]>) => (this.serviceCategories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInServiceCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IServiceCategory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInServiceCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('serviceCategoryListModification', () => this.loadAll());
  }

  delete(serviceCategory: IServiceCategory): void {
    const modalRef = this.modalService.open(ServiceCategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.serviceCategory = serviceCategory;
  }
}
