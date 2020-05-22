import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { ServiceEntryTimeLogDetailComponent } from 'app/entities/service-entry-time-log/service-entry-time-log-detail.component';
import { ServiceEntryTimeLog } from 'app/shared/model/service-entry-time-log.model';

describe('Component Tests', () => {
  describe('ServiceEntryTimeLog Management Detail Component', () => {
    let comp: ServiceEntryTimeLogDetailComponent;
    let fixture: ComponentFixture<ServiceEntryTimeLogDetailComponent>;
    const route = ({ data: of({ serviceEntryTimeLog: new ServiceEntryTimeLog(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceEntryTimeLogDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ServiceEntryTimeLogDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServiceEntryTimeLogDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load serviceEntryTimeLog on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.serviceEntryTimeLog).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
