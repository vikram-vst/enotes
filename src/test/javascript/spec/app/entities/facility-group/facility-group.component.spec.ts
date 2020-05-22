import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { FacilityGroupComponent } from 'app/entities/facility-group/facility-group.component';
import { FacilityGroupService } from 'app/entities/facility-group/facility-group.service';
import { FacilityGroup } from 'app/shared/model/facility-group.model';

describe('Component Tests', () => {
  describe('FacilityGroup Management Component', () => {
    let comp: FacilityGroupComponent;
    let fixture: ComponentFixture<FacilityGroupComponent>;
    let service: FacilityGroupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FacilityGroupComponent]
      })
        .overrideTemplate(FacilityGroupComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacilityGroupComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacilityGroupService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FacilityGroup(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.facilityGroups && comp.facilityGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
