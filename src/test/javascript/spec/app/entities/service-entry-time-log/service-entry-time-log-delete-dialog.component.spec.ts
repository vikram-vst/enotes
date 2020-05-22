import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EnotesTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { ServiceEntryTimeLogDeleteDialogComponent } from 'app/entities/service-entry-time-log/service-entry-time-log-delete-dialog.component';
import { ServiceEntryTimeLogService } from 'app/entities/service-entry-time-log/service-entry-time-log.service';

describe('Component Tests', () => {
  describe('ServiceEntryTimeLog Management Delete Component', () => {
    let comp: ServiceEntryTimeLogDeleteDialogComponent;
    let fixture: ComponentFixture<ServiceEntryTimeLogDeleteDialogComponent>;
    let service: ServiceEntryTimeLogService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceEntryTimeLogDeleteDialogComponent]
      })
        .overrideTemplate(ServiceEntryTimeLogDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServiceEntryTimeLogDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceEntryTimeLogService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
