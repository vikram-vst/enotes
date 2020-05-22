import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { PreferenceTypeComponent } from 'app/entities/preference-type/preference-type.component';
import { PreferenceTypeService } from 'app/entities/preference-type/preference-type.service';
import { PreferenceType } from 'app/shared/model/preference-type.model';

describe('Component Tests', () => {
  describe('PreferenceType Management Component', () => {
    let comp: PreferenceTypeComponent;
    let fixture: ComponentFixture<PreferenceTypeComponent>;
    let service: PreferenceTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [PreferenceTypeComponent]
      })
        .overrideTemplate(PreferenceTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PreferenceTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PreferenceTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PreferenceType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.preferenceTypes && comp.preferenceTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
