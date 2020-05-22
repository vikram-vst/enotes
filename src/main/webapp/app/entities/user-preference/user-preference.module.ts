import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { UserPreferenceComponent } from './user-preference.component';
import { UserPreferenceDetailComponent } from './user-preference-detail.component';
import { UserPreferenceUpdateComponent } from './user-preference-update.component';
import { UserPreferenceDeleteDialogComponent } from './user-preference-delete-dialog.component';
import { userPreferenceRoute } from './user-preference.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(userPreferenceRoute)],
  declarations: [
    UserPreferenceComponent,
    UserPreferenceDetailComponent,
    UserPreferenceUpdateComponent,
    UserPreferenceDeleteDialogComponent
  ],
  entryComponents: [UserPreferenceDeleteDialogComponent]
})
export class EnotesUserPreferenceModule {}
