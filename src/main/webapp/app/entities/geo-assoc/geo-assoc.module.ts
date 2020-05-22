import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { GeoAssocComponent } from './geo-assoc.component';
import { GeoAssocDetailComponent } from './geo-assoc-detail.component';
import { GeoAssocUpdateComponent } from './geo-assoc-update.component';
import { GeoAssocDeleteDialogComponent } from './geo-assoc-delete-dialog.component';
import { geoAssocRoute } from './geo-assoc.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(geoAssocRoute)],
  declarations: [GeoAssocComponent, GeoAssocDetailComponent, GeoAssocUpdateComponent, GeoAssocDeleteDialogComponent],
  entryComponents: [GeoAssocDeleteDialogComponent]
})
export class EnotesGeoAssocModule {}
