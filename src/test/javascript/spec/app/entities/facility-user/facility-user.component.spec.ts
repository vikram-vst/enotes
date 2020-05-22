import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { FacilityUserComponent } from 'app/entities/facility-user/facility-user.component';
import { FacilityUserService } from 'app/entities/facility-user/facility-user.service';
import { FacilityUser } from 'app/shared/model/facility-user.model';

describe('Component Tests', () => {
  describe('FacilityUser Management Component', () => {
    let comp: FacilityUserComponent;
    let fixture: ComponentFixture<FacilityUserComponent>;
    let service: FacilityUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FacilityUserComponent]
      })
        .overrideTemplate(FacilityUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacilityUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacilityUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FacilityUser(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.facilityUsers && comp.facilityUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
