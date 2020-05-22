import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { ServiceEntryStatusLogComponent } from './service-entry-status-log.component';
import { ServiceEntryStatusLogDetailComponent } from './service-entry-status-log-detail.component';
import { ServiceEntryStatusLogUpdateComponent } from './service-entry-status-log-update.component';
import { ServiceEntryStatusLogDeleteDialogComponent } from './service-entry-status-log-delete-dialog.component';
import { serviceEntryStatusLogRoute } from './service-entry-status-log.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(serviceEntryStatusLogRoute)],
  declarations: [
    ServiceEntryStatusLogComponent,
    ServiceEntryStatusLogDetailComponent,
    ServiceEntryStatusLogUpdateComponent,
    ServiceEntryStatusLogDeleteDialogComponent
  ],
  entryComponents: [ServiceEntryStatusLogDeleteDialogComponent]
})
export class EnotesServiceEntryStatusLogModule {}
