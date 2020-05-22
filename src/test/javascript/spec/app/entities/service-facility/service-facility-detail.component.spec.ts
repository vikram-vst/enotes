import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { ServiceFacilityDetailComponent } from 'app/entities/service-facility/service-facility-detail.component';
import { ServiceFacility } from 'app/shared/model/service-facility.model';

describe('Component Tests', () => {
  describe('ServiceFacility Management Detail Component', () => {
    let comp: ServiceFacilityDetailComponent;
    let fixture: ComponentFixture<ServiceFacilityDetailComponent>;
    const route = ({ data: of({ serviceFacility: new ServiceFacility(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceFacilityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ServiceFacilityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServiceFacilityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load serviceFacility on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.serviceFacility).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
