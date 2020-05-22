import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGeoPoint } from 'app/shared/model/geo-point.model';
import { GeoPointService } from './geo-point.service';
import { GeoPointDeleteDialogComponent } from './geo-point-delete-dialog.component';

@Component({
  selector: 'sys-geo-point',
  templateUrl: './geo-point.component.html'
})
export class GeoPointComponent implements OnInit, OnDestroy {
  geoPoints?: IGeoPoint[];
  eventSubscriber?: Subscription;

  constructor(protected geoPointService: GeoPointService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.geoPointService.query().subscribe((res: HttpResponse<IGeoPoint[]>) => (this.geoPoints = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGeoPoints();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGeoPoint): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGeoPoints(): void {
    this.eventSubscriber = this.eventManager.subscribe('geoPointListModification', () => this.loadAll());
  }

  delete(geoPoint: IGeoPoint): void {
    const modalRef = this.modalService.open(GeoPointDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.geoPoint = geoPoint;
  }
}
