import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { FrequencyUpdateComponent } from 'app/entities/frequency/frequency-update.component';
import { FrequencyService } from 'app/entities/frequency/frequency.service';
import { Frequency } from 'app/shared/model/frequency.model';

describe('Component Tests', () => {
  describe('Frequency Management Update Component', () => {
    let comp: FrequencyUpdateComponent;
    let fixture: ComponentFixture<FrequencyUpdateComponent>;
    let service: FrequencyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FrequencyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FrequencyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FrequencyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FrequencyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Frequency(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Frequency();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
