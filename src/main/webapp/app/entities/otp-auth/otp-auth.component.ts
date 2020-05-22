import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOtpAuth } from 'app/shared/model/otp-auth.model';
import { OtpAuthService } from './otp-auth.service';
import { OtpAuthDeleteDialogComponent } from './otp-auth-delete-dialog.component';

@Component({
  selector: 'sys-otp-auth',
  templateUrl: './otp-auth.component.html'
})
export class OtpAuthComponent implements OnInit, OnDestroy {
  otpAuths?: IOtpAuth[];
  eventSubscriber?: Subscription;

  constructor(protected otpAuthService: OtpAuthService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.otpAuthService.query().subscribe((res: HttpResponse<IOtpAuth[]>) => (this.otpAuths = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOtpAuths();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOtpAuth): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOtpAuths(): void {
    this.eventSubscriber = this.eventManager.subscribe('otpAuthListModification', () => this.loadAll());
  }

  delete(otpAuth: IOtpAuth): void {
    const modalRef = this.modalService.open(OtpAuthDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.otpAuth = otpAuth;
  }
}
