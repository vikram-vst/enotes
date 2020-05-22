import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { ServiceProviderRoleComponent } from 'app/entities/service-provider-role/service-provider-role.component';
import { ServiceProviderRoleService } from 'app/entities/service-provider-role/service-provider-role.service';
import { ServiceProviderRole } from 'app/shared/model/service-provider-role.model';

describe('Component Tests', () => {
  describe('ServiceProviderRole Management Component', () => {
    let comp: ServiceProviderRoleComponent;
    let fixture: ComponentFixture<ServiceProviderRoleComponent>;
    let service: ServiceProviderRoleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceProviderRoleComponent]
      })
        .overrideTemplate(ServiceProviderRoleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceProviderRoleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceProviderRoleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ServiceProviderRole(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.serviceProviderRoles && comp.serviceProviderRoles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
