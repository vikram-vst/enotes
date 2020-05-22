import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGeo } from 'app/shared/model/geo.model';
import { GeoService } from './geo.service';
import { GeoDeleteDialogComponent } from './geo-delete-dialog.component';

@Component({
  selector: 'sys-geo',
  templateUrl: './geo.component.html'
})
export class GeoComponent implements OnInit, OnDestroy {
  geos?: IGeo[];
  eventSubscriber?: Subscription;

  constructor(protected geoService: GeoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.geoService.query().subscribe((res: HttpResponse<IGeo[]>) => (this.geos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGeos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGeo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGeos(): void {
    this.eventSubscriber = this.eventManager.subscribe('geoListModification', () => this.loadAll());
  }

  delete(geo: IGeo): void {
    const modalRef = this.modalService.open(GeoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.geo = geo;
  }
}
