import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { PreferenceTypeUpdateComponent } from 'app/entities/preference-type/preference-type-update.component';
import { PreferenceTypeService } from 'app/entities/preference-type/preference-type.service';
import { PreferenceType } from 'app/shared/model/preference-type.model';

describe('Component Tests', () => {
  describe('PreferenceType Management Update Component', () => {
    let comp: PreferenceTypeUpdateComponent;
    let fixture: ComponentFixture<PreferenceTypeUpdateComponent>;
    let service: PreferenceTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [PreferenceTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PreferenceTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PreferenceTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PreferenceTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PreferenceType(123);
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
        const entity = new PreferenceType();
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
