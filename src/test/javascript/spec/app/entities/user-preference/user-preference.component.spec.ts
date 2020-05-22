import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { UserPreferenceComponent } from 'app/entities/user-preference/user-preference.component';
import { UserPreferenceService } from 'app/entities/user-preference/user-preference.service';
import { UserPreference } from 'app/shared/model/user-preference.model';

describe('Component Tests', () => {
  describe('UserPreference Management Component', () => {
    let comp: UserPreferenceComponent;
    let fixture: ComponentFixture<UserPreferenceComponent>;
    let service: UserPreferenceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [UserPreferenceComponent]
      })
        .overrideTemplate(UserPreferenceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserPreferenceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserPreferenceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserPreference(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userPreferences && comp.userPreferences[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
