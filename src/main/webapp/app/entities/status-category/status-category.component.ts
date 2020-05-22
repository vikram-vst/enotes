import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStatusCategory } from 'app/shared/model/status-category.model';
import { StatusCategoryService } from './status-category.service';
import { StatusCategoryDeleteDialogComponent } from './status-category-delete-dialog.component';

@Component({
  selector: 'sys-status-category',
  templateUrl: './status-category.component.html'
})
export class StatusCategoryComponent implements OnInit, OnDestroy {
  statusCategories?: IStatusCategory[];
  eventSubscriber?: Subscription;

  constructor(
    protected statusCategoryService: StatusCategoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.statusCategoryService.query().subscribe((res: HttpResponse<IStatusCategory[]>) => (this.statusCategories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInStatusCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IStatusCategory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInStatusCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('statusCategoryListModification', () => this.loadAll());
  }

  delete(statusCategory: IStatusCategory): void {
    const modalRef = this.modalService.open(StatusCategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.statusCategory = statusCategory;
  }
}
