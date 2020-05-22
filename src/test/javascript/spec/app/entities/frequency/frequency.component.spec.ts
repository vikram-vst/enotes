import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { FrequencyComponent } from 'app/entities/frequency/frequency.component';
import { FrequencyService } from 'app/entities/frequency/frequency.service';
import { Frequency } from 'app/shared/model/frequency.model';

describe('Component Tests', () => {
  describe('Frequency Management Component', () => {
    let comp: FrequencyComponent;
    let fixture: ComponentFixture<FrequencyComponent>;
    let service: FrequencyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FrequencyComponent]
      })
        .overrideTemplate(FrequencyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FrequencyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FrequencyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Frequency(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.frequencies && comp.frequencies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
