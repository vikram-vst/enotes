import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { PreferenceTypeDetailComponent } from 'app/entities/preference-type/preference-type-detail.component';
import { PreferenceType } from 'app/shared/model/preference-type.model';

describe('Component Tests', () => {
  describe('PreferenceType Management Detail Component', () => {
    let comp: PreferenceTypeDetailComponent;
    let fixture: ComponentFixture<PreferenceTypeDetailComponent>;
    const route = ({ data: of({ preferenceType: new PreferenceType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [PreferenceTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PreferenceTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PreferenceTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load preferenceType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.preferenceType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
