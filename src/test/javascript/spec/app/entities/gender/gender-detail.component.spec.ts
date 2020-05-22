import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { GenderDetailComponent } from 'app/entities/gender/gender-detail.component';
import { Gender } from 'app/shared/model/gender.model';

describe('Component Tests', () => {
  describe('Gender Management Detail Component', () => {
    let comp: GenderDetailComponent;
    let fixture: ComponentFixture<GenderDetailComponent>;
    const route = ({ data: of({ gender: new Gender(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GenderDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GenderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GenderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load gender on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.gender).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
