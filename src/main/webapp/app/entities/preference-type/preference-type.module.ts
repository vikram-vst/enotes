import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { PreferenceTypeComponent } from './preference-type.component';
import { PreferenceTypeDetailComponent } from './preference-type-detail.component';
import { PreferenceTypeUpdateComponent } from './preference-type-update.component';
import { PreferenceTypeDeleteDialogComponent } from './preference-type-delete-dialog.component';
import { preferenceTypeRoute } from './preference-type.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(preferenceTypeRoute)],
  declarations: [
    PreferenceTypeComponent,
    PreferenceTypeDetailComponent,
    PreferenceTypeUpdateComponent,
    PreferenceTypeDeleteDialogComponent
  ],
  entryComponents: [PreferenceTypeDeleteDialogComponent]
})
export class EnotesPreferenceTypeModule {}
