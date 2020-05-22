import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { ServiceEntryUpdateComponent } from 'app/entities/service-entry/service-entry-update.component';
import { ServiceEntryService } from 'app/entities/service-entry/service-entry.service';
import { ServiceEntry } from 'app/shared/model/service-entry.model';

describe('Component Tests', () => {
  describe('ServiceEntry Management Update Component', () => {
    let comp: ServiceEntryUpdateComponent;
    let fixture: ComponentFixture<ServiceEntryUpdateComponent>;
    let service: ServiceEntryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceEntryUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ServiceEntryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceEntryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceEntryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceEntry(123);
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
        const entity = new ServiceEntry();
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
