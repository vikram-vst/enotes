import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { FacilityGroupComponent } from './facility-group.component';
import { FacilityGroupDetailComponent } from './facility-group-detail.component';
import { FacilityGroupUpdateComponent } from './facility-group-update.component';
import { FacilityGroupDeleteDialogComponent } from './facility-group-delete-dialog.component';
import { facilityGroupRoute } from './facility-group.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(facilityGroupRoute)],
  declarations: [FacilityGroupComponent, FacilityGroupDetailComponent, FacilityGroupUpdateComponent, FacilityGroupDeleteDialogComponent],
  entryComponents: [FacilityGroupDeleteDialogComponent]
})
export class EnotesFacilityGroupModule {}
