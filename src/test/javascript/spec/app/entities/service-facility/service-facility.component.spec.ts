import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { ServiceFacilityComponent } from 'app/entities/service-facility/service-facility.component';
import { ServiceFacilityService } from 'app/entities/service-facility/service-facility.service';
import { ServiceFacility } from 'app/shared/model/service-facility.model';

describe('Component Tests', () => {
  describe('ServiceFacility Management Component', () => {
    let comp: ServiceFacilityComponent;
    let fixture: ComponentFixture<ServiceFacilityComponent>;
    let service: ServiceFacilityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceFacilityComponent]
      })
        .overrideTemplate(ServiceFacilityComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceFacilityComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceFacilityService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ServiceFacility(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.serviceFacilities && comp.serviceFacilities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
