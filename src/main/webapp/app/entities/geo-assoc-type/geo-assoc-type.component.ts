import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGeoAssocType } from 'app/shared/model/geo-assoc-type.model';
import { GeoAssocTypeService } from './geo-assoc-type.service';
import { GeoAssocTypeDeleteDialogComponent } from './geo-assoc-type-delete-dialog.component';

@Component({
  selector: 'sys-geo-assoc-type',
  templateUrl: './geo-assoc-type.component.html'
})
export class GeoAssocTypeComponent implements OnInit, OnDestroy {
  geoAssocTypes?: IGeoAssocType[];
  eventSubscriber?: Subscription;

  constructor(
    protected geoAssocTypeService: GeoAssocTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.geoAssocTypeService.query().subscribe((res: HttpResponse<IGeoAssocType[]>) => (this.geoAssocTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGeoAssocTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGeoAssocType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGeoAssocTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('geoAssocTypeListModification', () => this.loadAll());
  }

  delete(geoAssocType: IGeoAssocType): void {
    const modalRef = this.modalService.open(GeoAssocTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.geoAssocType = geoAssocType;
  }
}
