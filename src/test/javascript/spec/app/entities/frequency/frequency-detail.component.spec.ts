import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { FrequencyDetailComponent } from 'app/entities/frequency/frequency-detail.component';
import { Frequency } from 'app/shared/model/frequency.model';

describe('Component Tests', () => {
  describe('Frequency Management Detail Component', () => {
    let comp: FrequencyDetailComponent;
    let fixture: ComponentFixture<FrequencyDetailComponent>;
    const route = ({ data: of({ frequency: new Frequency(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FrequencyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FrequencyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FrequencyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load frequency on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.frequency).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
