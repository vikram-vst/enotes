import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { FrequencyComponent } from './frequency.component';
import { FrequencyDetailComponent } from './frequency-detail.component';
import { FrequencyUpdateComponent } from './frequency-update.component';
import { FrequencyDeleteDialogComponent } from './frequency-delete-dialog.component';
import { frequencyRoute } from './frequency.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(frequencyRoute)],
  declarations: [FrequencyComponent, FrequencyDetailComponent, FrequencyUpdateComponent, FrequencyDeleteDialogComponent],
  entryComponents: [FrequencyDeleteDialogComponent]
})
export class EnotesFrequencyModule {}
