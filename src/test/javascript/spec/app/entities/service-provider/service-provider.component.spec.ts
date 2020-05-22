import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { ServiceProviderComponent } from 'app/entities/service-provider/service-provider.component';
import { ServiceProviderService } from 'app/entities/service-provider/service-provider.service';
import { ServiceProvider } from 'app/shared/model/service-provider.model';

describe('Component Tests', () => {
  describe('ServiceProvider Management Component', () => {
    let comp: ServiceProviderComponent;
    let fixture: ComponentFixture<ServiceProviderComponent>;
    let service: ServiceProviderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceProviderComponent]
      })
        .overrideTemplate(ServiceProviderComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceProviderComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceProviderService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ServiceProvider(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.serviceProviders && comp.serviceProviders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
