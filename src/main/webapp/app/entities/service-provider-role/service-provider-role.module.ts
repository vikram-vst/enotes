import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnotesSharedModule } from 'app/shared/shared.module';
import { ServiceProviderRoleComponent } from './service-provider-role.component';
import { ServiceProviderRoleDetailComponent } from './service-provider-role-detail.component';
import { ServiceProviderRoleUpdateComponent } from './service-provider-role-update.component';
import { ServiceProviderRoleDeleteDialogComponent } from './service-provider-role-delete-dialog.component';
import { serviceProviderRoleRoute } from './service-provider-role.route';

@NgModule({
  imports: [EnotesSharedModule, RouterModule.forChild(serviceProviderRoleRoute)],
  declarations: [
    ServiceProviderRoleComponent,
    ServiceProviderRoleDetailComponent,
    ServiceProviderRoleUpdateComponent,
    ServiceProviderRoleDeleteDialogComponent
  ],
  entryComponents: [ServiceProviderRoleDeleteDialogComponent]
})
export class EnotesServiceProviderRoleModule {}
