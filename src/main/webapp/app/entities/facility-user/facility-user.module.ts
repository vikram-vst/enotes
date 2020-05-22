import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { FacilityUserComponent } from './facility-user.component';
import { FacilityUserDetailComponent } from './facility-user-detail.component';
import { FacilityUserUpdateComponent } from './facility-user-update.component';
import { FacilityUserDeleteDialogComponent } from './facility-user-delete-dialog.component';
import { facilityUserRoute } from './facility-user.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(facilityUserRoute)],
  declarations: [FacilityUserComponent, FacilityUserDetailComponent, FacilityUserUpdateComponent, FacilityUserDeleteDialogComponent],
  entryComponents: [FacilityUserDeleteDialogComponent]
})
export class EnotesFacilityUserModule {}
