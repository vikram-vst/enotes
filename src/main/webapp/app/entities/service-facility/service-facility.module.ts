import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { ServiceFacilityComponent } from './service-facility.component';
import { ServiceFacilityDetailComponent } from './service-facility-detail.component';
import { ServiceFacilityUpdateComponent } from './service-facility-update.component';
import { ServiceFacilityDeleteDialogComponent } from './service-facility-delete-dialog.component';
import { serviceFacilityRoute } from './service-facility.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(serviceFacilityRoute)],
  declarations: [
    ServiceFacilityComponent,
    ServiceFacilityDetailComponent,
    ServiceFacilityUpdateComponent,
    ServiceFacilityDeleteDialogComponent
  ],
  entryComponents: [ServiceFacilityDeleteDialogComponent]
})
export class EnotesServiceFacilityModule {}
