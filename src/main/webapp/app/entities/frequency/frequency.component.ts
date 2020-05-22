import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFrequency } from 'app/shared/model/frequency.model';
import { FrequencyService } from './frequency.service';
import { FrequencyDeleteDialogComponent } from './frequency-delete-dialog.component';

@Component({
  selector: 'sys-frequency',
  templateUrl: './frequency.component.html'
})
export class FrequencyComponent implements OnInit, OnDestroy {
  frequencies?: IFrequency[];
  eventSubscriber?: Subscription;

  constructor(protected frequencyService: FrequencyService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.frequencyService.query().subscribe((res: HttpResponse<IFrequency[]>) => (this.frequencies = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFrequencies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFrequency): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFrequencies(): void {
    this.eventSubscriber = this.eventManager.subscribe('frequencyListModification', () => this.loadAll());
  }

  delete(frequency: IFrequency): void {
    const modalRef = this.modalService.open(FrequencyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.frequency = frequency;
  }
}
