import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { FacilityGroupTypeComponent } from 'app/entities/facility-group-type/facility-group-type.component';
import { FacilityGroupTypeService } from 'app/entities/facility-group-type/facility-group-type.service';
import { FacilityGroupType } from 'app/shared/model/facility-group-type.model';

describe('Component Tests', () => {
  describe('FacilityGroupType Management Component', () => {
    let comp: FacilityGroupTypeComponent;
    let fixture: ComponentFixture<FacilityGroupTypeComponent>;
    let service: FacilityGroupTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FacilityGroupTypeComponent]
      })
        .overrideTemplate(FacilityGroupTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacilityGroupTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacilityGroupTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FacilityGroupType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.facilityGroupTypes && comp.facilityGroupTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
