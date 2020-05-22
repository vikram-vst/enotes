import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { ServiceCategoryComponent } from './service-category.component';
import { ServiceCategoryDetailComponent } from './service-category-detail.component';
import { ServiceCategoryUpdateComponent } from './service-category-update.component';
import { ServiceCategoryDeleteDialogComponent } from './service-category-delete-dialog.component';
import { serviceCategoryRoute } from './service-category.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(serviceCategoryRoute)],
  declarations: [
    ServiceCategoryComponent,
    ServiceCategoryDetailComponent,
    ServiceCategoryUpdateComponent,
    ServiceCategoryDeleteDialogComponent
  ],
  entryComponents: [ServiceCategoryDeleteDialogComponent]
})
export class EnotesServiceCategoryModule {}
