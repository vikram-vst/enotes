import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGeoType } from 'app/shared/model/geo-type.model';
import { GeoTypeService } from './geo-type.service';
import { GeoTypeDeleteDialogComponent } from './geo-type-delete-dialog.component';

@Component({
  selector: 'sys-geo-type',
  templateUrl: './geo-type.component.html'
})
export class GeoTypeComponent implements OnInit, OnDestroy {
  geoTypes?: IGeoType[];
  eventSubscriber?: Subscription;

  constructor(protected geoTypeService: GeoTypeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.geoTypeService.query().subscribe((res: HttpResponse<IGeoType[]>) => (this.geoTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGeoTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGeoType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGeoTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('geoTypeListModification', () => this.loadAll());
  }

  delete(geoType: IGeoType): void {
    const modalRef = this.modalService.open(GeoTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.geoType = geoType;
  }
}
