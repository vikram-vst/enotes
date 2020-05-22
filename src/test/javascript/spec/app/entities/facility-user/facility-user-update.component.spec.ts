import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { FacilityUserUpdateComponent } from 'app/entities/facility-user/facility-user-update.component';
import { FacilityUserService } from 'app/entities/facility-user/facility-user.service';
import { FacilityUser } from 'app/shared/model/facility-user.model';

describe('Component Tests', () => {
  describe('FacilityUser Management Update Component', () => {
    let comp: FacilityUserUpdateComponent;
    let fixture: ComponentFixture<FacilityUserUpdateComponent>;
    let service: FacilityUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FacilityUserUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FacilityUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacilityUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacilityUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FacilityUser(123);
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
        const entity = new FacilityUser();
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
