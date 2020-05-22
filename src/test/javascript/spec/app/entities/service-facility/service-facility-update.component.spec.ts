import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { ServiceFacilityUpdateComponent } from 'app/entities/service-facility/service-facility-update.component';
import { ServiceFacilityService } from 'app/entities/service-facility/service-facility.service';
import { ServiceFacility } from 'app/shared/model/service-facility.model';

describe('Component Tests', () => {
  describe('ServiceFacility Management Update Component', () => {
    let comp: ServiceFacilityUpdateComponent;
    let fixture: ComponentFixture<ServiceFacilityUpdateComponent>;
    let service: ServiceFacilityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceFacilityUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ServiceFacilityUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceFacilityUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceFacilityService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceFacility(123);
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
        const entity = new ServiceFacility();
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
