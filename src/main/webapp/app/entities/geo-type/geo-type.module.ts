import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { GeoTypeComponent } from './geo-type.component';
import { GeoTypeDetailComponent } from './geo-type-detail.component';
import { GeoTypeUpdateComponent } from './geo-type-update.component';
import { GeoTypeDeleteDialogComponent } from './geo-type-delete-dialog.component';
import { geoTypeRoute } from './geo-type.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(geoTypeRoute)],
  declarations: [GeoTypeComponent, GeoTypeDetailComponent, GeoTypeUpdateComponent, GeoTypeDeleteDialogComponent],
  entryComponents: [GeoTypeDeleteDialogComponent]
})
export class EnotesGeoTypeModule {}
