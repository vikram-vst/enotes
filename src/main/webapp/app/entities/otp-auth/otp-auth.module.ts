import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { OtpAuthComponent } from './otp-auth.component';
import { OtpAuthDetailComponent } from './otp-auth-detail.component';
import { OtpAuthUpdateComponent } from './otp-auth-update.component';
import { OtpAuthDeleteDialogComponent } from './otp-auth-delete-dialog.component';
import { otpAuthRoute } from './otp-auth.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(otpAuthRoute)],
  declarations: [OtpAuthComponent, OtpAuthDetailComponent, OtpAuthUpdateComponent, OtpAuthDeleteDialogComponent],
  entryComponents: [OtpAuthDeleteDialogComponent]
})
export class EnotesOtpAuthModule {}
