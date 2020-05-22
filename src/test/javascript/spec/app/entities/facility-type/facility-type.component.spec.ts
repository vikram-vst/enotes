import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { FacilityTypeComponent } from 'app/entities/facility-type/facility-type.component';
import { FacilityTypeService } from 'app/entities/facility-type/facility-type.service';
import { FacilityType } from 'app/shared/model/facility-type.model';

describe('Component Tests', () => {
  describe('FacilityType Management Component', () => {
    let comp: FacilityTypeComponent;
    let fixture: ComponentFixture<FacilityTypeComponent>;
    let service: FacilityTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FacilityTypeComponent]
      })
        .overrideTemplate(FacilityTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacilityTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacilityTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FacilityType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.facilityTypes && comp.facilityTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
