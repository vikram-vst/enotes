import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { GeoPointComponent } from './geo-point.component';
import { GeoPointDetailComponent } from './geo-point-detail.component';
import { GeoPointUpdateComponent } from './geo-point-update.component';
import { GeoPointDeleteDialogComponent } from './geo-point-delete-dialog.component';
import { geoPointRoute } from './geo-point.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(geoPointRoute)],
  declarations: [GeoPointComponent, GeoPointDetailComponent, GeoPointUpdateComponent, GeoPointDeleteDialogComponent],
  entryComponents: [GeoPointDeleteDialogComponent]
})
export class EnotesGeoPointModule {}
