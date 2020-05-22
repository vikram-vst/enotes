import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGender } from 'app/shared/model/gender.model';
import { GenderService } from './gender.service';
import { GenderDeleteDialogComponent } from './gender-delete-dialog.component';

@Component({
  selector: 'sys-gender',
  templateUrl: './gender.component.html'
})
export class GenderComponent implements OnInit, OnDestroy {
  genders?: IGender[];
  eventSubscriber?: Subscription;

  constructor(protected genderService: GenderService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.genderService.query().subscribe((res: HttpResponse<IGender[]>) => (this.genders = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGenders();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGender): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGenders(): void {
    this.eventSubscriber = this.eventManager.subscribe('genderListModification', () => this.loadAll());
  }

  delete(gender: IGender): void {
    const modalRef = this.modalService.open(GenderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.gender = gender;
  }
}
