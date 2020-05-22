import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { ServiceEntryComponent } from './service-entry.component';
import { ServiceEntryDetailComponent } from './service-entry-detail.component';
import { ServiceEntryUpdateComponent } from './service-entry-update.component';
import { ServiceEntryDeleteDialogComponent } from './service-entry-delete-dialog.component';
import { serviceEntryRoute } from './service-entry.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(serviceEntryRoute)],
  declarations: [ServiceEntryComponent, ServiceEntryDetailComponent, ServiceEntryUpdateComponent, ServiceEntryDeleteDialogComponent],
  entryComponents: [ServiceEntryDeleteDialogComponent]
})
export class EnotesServiceEntryModule {}
