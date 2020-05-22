import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { FacilityGroupUpdateComponent } from 'app/entities/facility-group/facility-group-update.component';
import { FacilityGroupService } from 'app/entities/facility-group/facility-group.service';
import { FacilityGroup } from 'app/shared/model/facility-group.model';

describe('Component Tests', () => {
  describe('FacilityGroup Management Update Component', () => {
    let comp: FacilityGroupUpdateComponent;
    let fixture: ComponentFixture<FacilityGroupUpdateComponent>;
    let service: FacilityGroupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FacilityGroupUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FacilityGroupUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacilityGroupUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacilityGroupService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FacilityGroup(123);
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
        const entity = new FacilityGroup();
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
