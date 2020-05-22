import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { ServiceEntryComponent } from 'app/entities/service-entry/service-entry.component';
import { ServiceEntryService } from 'app/entities/service-entry/service-entry.service';
import { ServiceEntry } from 'app/shared/model/service-entry.model';

describe('Component Tests', () => {
  describe('ServiceEntry Management Component', () => {
    let comp: ServiceEntryComponent;
    let fixture: ComponentFixture<ServiceEntryComponent>;
    let service: ServiceEntryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceEntryComponent]
      })
        .overrideTemplate(ServiceEntryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceEntryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceEntryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ServiceEntry(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.serviceEntries && comp.serviceEntries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
