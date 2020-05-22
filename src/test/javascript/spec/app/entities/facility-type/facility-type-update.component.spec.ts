import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { FacilityTypeUpdateComponent } from 'app/entities/facility-type/facility-type-update.component';
import { FacilityTypeService } from 'app/entities/facility-type/facility-type.service';
import { FacilityType } from 'app/shared/model/facility-type.model';

describe('Component Tests', () => {
  describe('FacilityType Management Update Component', () => {
    let comp: FacilityTypeUpdateComponent;
    let fixture: ComponentFixture<FacilityTypeUpdateComponent>;
    let service: FacilityTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FacilityTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FacilityTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacilityTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacilityTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FacilityType(123);
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
        const entity = new FacilityType();
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
