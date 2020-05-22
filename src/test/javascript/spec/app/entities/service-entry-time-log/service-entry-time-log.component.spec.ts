import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { ServiceEntryTimeLogComponent } from 'app/entities/service-entry-time-log/service-entry-time-log.component';
import { ServiceEntryTimeLogService } from 'app/entities/service-entry-time-log/service-entry-time-log.service';
import { ServiceEntryTimeLog } from 'app/shared/model/service-entry-time-log.model';

describe('Component Tests', () => {
  describe('ServiceEntryTimeLog Management Component', () => {
    let comp: ServiceEntryTimeLogComponent;
    let fixture: ComponentFixture<ServiceEntryTimeLogComponent>;
    let service: ServiceEntryTimeLogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceEntryTimeLogComponent]
      })
        .overrideTemplate(ServiceEntryTimeLogComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceEntryTimeLogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceEntryTimeLogService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ServiceEntryTimeLog(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.serviceEntryTimeLogs && comp.serviceEntryTimeLogs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
