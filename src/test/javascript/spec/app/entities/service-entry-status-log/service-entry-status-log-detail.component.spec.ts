import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { ServiceEntryStatusLogDetailComponent } from 'app/entities/service-entry-status-log/service-entry-status-log-detail.component';
import { ServiceEntryStatusLog } from 'app/shared/model/service-entry-status-log.model';

describe('Component Tests', () => {
  describe('ServiceEntryStatusLog Management Detail Component', () => {
    let comp: ServiceEntryStatusLogDetailComponent;
    let fixture: ComponentFixture<ServiceEntryStatusLogDetailComponent>;
    const route = ({ data: of({ serviceEntryStatusLog: new ServiceEntryStatusLog(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceEntryStatusLogDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ServiceEntryStatusLogDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServiceEntryStatusLogDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load serviceEntryStatusLog on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.serviceEntryStatusLog).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
