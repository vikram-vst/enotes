import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOtpAuth } from 'app/shared/model/otp-auth.model';

@Component({
  selector: 'sys-otp-auth-detail',
  templateUrl: './otp-auth-detail.component.html'
})
export class OtpAuthDetailComponent implements OnInit {
  otpAuth: IOtpAuth | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ otpAuth }) => (this.otpAuth = otpAuth));
  }

  previousState(): void {
    window.history.back();
  }
}
