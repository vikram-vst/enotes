import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { GeoComponent } from './geo.component';
import { GeoDetailComponent } from './geo-detail.component';
import { GeoUpdateComponent } from './geo-update.component';
import { GeoDeleteDialogComponent } from './geo-delete-dialog.component';
import { geoRoute } from './geo.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(geoRoute)],
  declarations: [GeoComponent, GeoDetailComponent, GeoUpdateComponent, GeoDeleteDialogComponent],
  entryComponents: [GeoDeleteDialogComponent]
})
export class EnotesGeoModule {}
