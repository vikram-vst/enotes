import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { UserPreferenceDetailComponent } from 'app/entities/user-preference/user-preference-detail.component';
import { UserPreference } from 'app/shared/model/user-preference.model';

describe('Component Tests', () => {
  describe('UserPreference Management Detail Component', () => {
    let comp: UserPreferenceDetailComponent;
    let fixture: ComponentFixture<UserPreferenceDetailComponent>;
    const route = ({ data: of({ userPreference: new UserPreference(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [UserPreferenceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserPreferenceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserPreferenceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userPreference on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userPreference).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
