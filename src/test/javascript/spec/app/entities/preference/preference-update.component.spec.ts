import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { PreferenceUpdateComponent } from 'app/entities/preference/preference-update.component';
import { PreferenceService } from 'app/entities/preference/preference.service';
import { Preference } from 'app/shared/model/preference.model';

describe('Component Tests', () => {
  describe('Preference Management Update Component', () => {
    let comp: PreferenceUpdateComponent;
    let fixture: ComponentFixture<PreferenceUpdateComponent>;
    let service: PreferenceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [PreferenceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PreferenceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PreferenceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PreferenceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Preference(123);
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
        const entity = new Preference();
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
