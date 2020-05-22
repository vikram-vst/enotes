import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'person',
        loadChildren: () => import('./person/person.module').then(m => m.EnotesPersonModule)
      },
      {
        path: 'user-preference',
        loadChildren: () => import('./user-preference/user-preference.module').then(m => m.EnotesUserPreferenceModule)
      },
      {
        path: 'preference',
        loadChildren: () => import('./preference/preference.module').then(m => m.EnotesPreferenceModule)
      },
      {
        path: 'preference-type',
        loadChildren: () => import('./preference-type/preference-type.module').then(m => m.EnotesPreferenceTypeModule)
      },
      {
        path: 'language',
        loadChildren: () => import('./language/language.module').then(m => m.EnotesLanguageModule)
      },
      {
        path: 'gender',
        loadChildren: () => import('./gender/gender.module').then(m => m.EnotesGenderModule)
      },
      {
        path: 'address-type',
        loadChildren: () => import('./address-type/address-type.module').then(m => m.EnotesAddressTypeModule)
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.EnotesAddressModule)
      },
      {
        path: 'otp-auth',
        loadChildren: () => import('./otp-auth/otp-auth.module').then(m => m.EnotesOtpAuthModule)
      },
      {
        path: 'status-category',
        loadChildren: () => import('./status-category/status-category.module').then(m => m.EnotesStatusCategoryModule)
      },
      {
        path: 'status',
        loadChildren: () => import('./status/status.module').then(m => m.EnotesStatusModule)
      },
      {
        path: 'service-category',
        loadChildren: () => import('./service-category/service-category.module').then(m => m.EnotesServiceCategoryModule)
      },
      {
        path: 'service',
        loadChildren: () => import('./service/service.module').then(m => m.EnotesServiceModule)
      },
      {
        path: 'service-definition',
        loadChildren: () => import('./service-definition/service-definition.module').then(m => m.EnotesServiceDefinitionModule)
      },
      {
        path: 'service-provider',
        loadChildren: () => import('./service-provider/service-provider.module').then(m => m.EnotesServiceProviderModule)
      },
      {
        path: 'service-facility',
        loadChildren: () => import('./service-facility/service-facility.module').then(m => m.EnotesServiceFacilityModule)
      },
      {
        path: 'frequency',
        loadChildren: () => import('./frequency/frequency.module').then(m => m.EnotesFrequencyModule)
      },
      {
        path: 'service-provider-role',
        loadChildren: () => import('./service-provider-role/service-provider-role.module').then(m => m.EnotesServiceProviderRoleModule)
      },
      {
        path: 'service-entry',
        loadChildren: () => import('./service-entry/service-entry.module').then(m => m.EnotesServiceEntryModule)
      },
      {
        path: 'service-entry-status-log',
        loadChildren: () =>
          import('./service-entry-status-log/service-entry-status-log.module').then(m => m.EnotesServiceEntryStatusLogModule)
      },
      {
        path: 'service-entry-time-log',
        loadChildren: () => import('./service-entry-time-log/service-entry-time-log.module').then(m => m.EnotesServiceEntryTimeLogModule)
      },
      {
        path: 'geo-type',
        loadChildren: () => import('./geo-type/geo-type.module').then(m => m.EnotesGeoTypeModule)
      },
      {
        path: 'geo-assoc-type',
        loadChildren: () => import('./geo-assoc-type/geo-assoc-type.module').then(m => m.EnotesGeoAssocTypeModule)
      },
      {
        path: 'geo',
        loadChildren: () => import('./geo/geo.module').then(m => m.EnotesGeoModule)
      },
      {
        path: 'geo-assoc',
        loadChildren: () => import('./geo-assoc/geo-assoc.module').then(m => m.EnotesGeoAssocModule)
      },
      {
        path: 'geo-point',
        loadChildren: () => import('./geo-point/geo-point.module').then(m => m.EnotesGeoPointModule)
      },
      {
        path: 'product-store',
        loadChildren: () => import('./product-store/product-store.module').then(m => m.EnotesProductStoreModule)
      },
      {
        path: 'facility-type',
        loadChildren: () => import('./facility-type/facility-type.module').then(m => m.EnotesFacilityTypeModule)
      },
      {
        path: 'facility-group-type',
        loadChildren: () => import('./facility-group-type/facility-group-type.module').then(m => m.EnotesFacilityGroupTypeModule)
      },
      {
        path: 'facility-group',
        loadChildren: () => import('./facility-group/facility-group.module').then(m => m.EnotesFacilityGroupModule)
      },
      {
        path: 'facility',
        loadChildren: () => import('./facility/facility.module').then(m => m.EnotesFacilityModule)
      },
      {
        path: 'facility-user',
        loadChildren: () => import('./facility-user/facility-user.module').then(m => m.EnotesFacilityUserModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class EnotesEntityModule {}
