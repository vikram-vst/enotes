import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { ServiceEntryStatusLogComponent } from 'app/entities/service-entry-status-log/service-entry-status-log.component';
import { ServiceEntryStatusLogService } from 'app/entities/service-entry-status-log/service-entry-status-log.service';
import { ServiceEntryStatusLog } from 'app/shared/model/service-entry-status-log.model';

describe('Component Tests', () => {
  describe('ServiceEntryStatusLog Management Component', () => {
    let comp: ServiceEntryStatusLogComponent;
    let fixture: ComponentFixture<ServiceEntryStatusLogComponent>;
    let service: ServiceEntryStatusLogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceEntryStatusLogComponent]
      })
        .overrideTemplate(ServiceEntryStatusLogComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceEntryStatusLogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceEntryStatusLogService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ServiceEntryStatusLog(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.serviceEntryStatusLogs && comp.serviceEntryStatusLogs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
