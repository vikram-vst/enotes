import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { StatusCategoryComponent } from './status-category.component';
import { StatusCategoryDetailComponent } from './status-category-detail.component';
import { StatusCategoryUpdateComponent } from './status-category-update.component';
import { StatusCategoryDeleteDialogComponent } from './status-category-delete-dialog.component';
import { statusCategoryRoute } from './status-category.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(statusCategoryRoute)],
  declarations: [
    StatusCategoryComponent,
    StatusCategoryDetailComponent,
    StatusCategoryUpdateComponent,
    StatusCategoryDeleteDialogComponent
  ],
  entryComponents: [StatusCategoryDeleteDialogComponent]
})
export class EnotesStatusCategoryModule {}
