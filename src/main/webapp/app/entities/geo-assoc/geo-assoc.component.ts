import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGeoAssoc } from 'app/shared/model/geo-assoc.model';
import { GeoAssocService } from './geo-assoc.service';
import { GeoAssocDeleteDialogComponent } from './geo-assoc-delete-dialog.component';

@Component({
  selector: 'sys-geo-assoc',
  templateUrl: './geo-assoc.component.html'
})
export class GeoAssocComponent implements OnInit, OnDestroy {
  geoAssocs?: IGeoAssoc[];
  eventSubscriber?: Subscription;

  constructor(protected geoAssocService: GeoAssocService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.geoAssocService.query().subscribe((res: HttpResponse<IGeoAssoc[]>) => (this.geoAssocs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGeoAssocs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGeoAssoc): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGeoAssocs(): void {
    this.eventSubscriber = this.eventManager.subscribe('geoAssocListModification', () => this.loadAll());
  }

  delete(geoAssoc: IGeoAssoc): void {
    const modalRef = this.modalService.open(GeoAssocDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.geoAssoc = geoAssoc;
  }
}
