import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { ServiceEntryStatusLogUpdateComponent } from 'app/entities/service-entry-status-log/service-entry-status-log-update.component';
import { ServiceEntryStatusLogService } from 'app/entities/service-entry-status-log/service-entry-status-log.service';
import { ServiceEntryStatusLog } from 'app/shared/model/service-entry-status-log.model';

describe('Component Tests', () => {
  describe('ServiceEntryStatusLog Management Update Component', () => {
    let comp: ServiceEntryStatusLogUpdateComponent;
    let fixture: ComponentFixture<ServiceEntryStatusLogUpdateComponent>;
    let service: ServiceEntryStatusLogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceEntryStatusLogUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ServiceEntryStatusLogUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceEntryStatusLogUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceEntryStatusLogService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceEntryStatusLog(123);
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
        const entity = new ServiceEntryStatusLog();
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
