import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { PreferenceDetailComponent } from 'app/entities/preference/preference-detail.component';
import { Preference } from 'app/shared/model/preference.model';

describe('Component Tests', () => {
  describe('Preference Management Detail Component', () => {
    let comp: PreferenceDetailComponent;
    let fixture: ComponentFixture<PreferenceDetailComponent>;
    const route = ({ data: of({ preference: new Preference(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [PreferenceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PreferenceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PreferenceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load preference on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.preference).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
