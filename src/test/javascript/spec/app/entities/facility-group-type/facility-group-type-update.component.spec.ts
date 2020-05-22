import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { FacilityGroupTypeUpdateComponent } from 'app/entities/facility-group-type/facility-group-type-update.component';
import { FacilityGroupTypeService } from 'app/entities/facility-group-type/facility-group-type.service';
import { FacilityGroupType } from 'app/shared/model/facility-group-type.model';

describe('Component Tests', () => {
  describe('FacilityGroupType Management Update Component', () => {
    let comp: FacilityGroupTypeUpdateComponent;
    let fixture: ComponentFixture<FacilityGroupTypeUpdateComponent>;
    let service: FacilityGroupTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FacilityGroupTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FacilityGroupTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacilityGroupTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacilityGroupTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FacilityGroupType(123);
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
        const entity = new FacilityGroupType();
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
