import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { ServiceEntryTimeLogUpdateComponent } from 'app/entities/service-entry-time-log/service-entry-time-log-update.component';
import { ServiceEntryTimeLogService } from 'app/entities/service-entry-time-log/service-entry-time-log.service';
import { ServiceEntryTimeLog } from 'app/shared/model/service-entry-time-log.model';

describe('Component Tests', () => {
  describe('ServiceEntryTimeLog Management Update Component', () => {
    let comp: ServiceEntryTimeLogUpdateComponent;
    let fixture: ComponentFixture<ServiceEntryTimeLogUpdateComponent>;
    let service: ServiceEntryTimeLogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceEntryTimeLogUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ServiceEntryTimeLogUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceEntryTimeLogUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceEntryTimeLogService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceEntryTimeLog(123);
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
        const entity = new ServiceEntryTimeLog();
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
