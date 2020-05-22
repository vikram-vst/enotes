import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { ServiceEntryTimeLogComponent } from './service-entry-time-log.component';
import { ServiceEntryTimeLogDetailComponent } from './service-entry-time-log-detail.component';
import { ServiceEntryTimeLogUpdateComponent } from './service-entry-time-log-update.component';
import { ServiceEntryTimeLogDeleteDialogComponent } from './service-entry-time-log-delete-dialog.component';
import { serviceEntryTimeLogRoute } from './service-entry-time-log.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(serviceEntryTimeLogRoute)],
  declarations: [
    ServiceEntryTimeLogComponent,
    ServiceEntryTimeLogDetailComponent,
    ServiceEntryTimeLogUpdateComponent,
    ServiceEntryTimeLogDeleteDialogComponent
  ],
  entryComponents: [ServiceEntryTimeLogDeleteDialogComponent]
})
export class EnotesServiceEntryTimeLogModule {}
