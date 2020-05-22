import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { FacilityTypeDetailComponent } from 'app/entities/facility-type/facility-type-detail.component';
import { FacilityType } from 'app/shared/model/facility-type.model';

describe('Component Tests', () => {
  describe('FacilityType Management Detail Component', () => {
    let comp: FacilityTypeDetailComponent;
    let fixture: ComponentFixture<FacilityTypeDetailComponent>;
    const route = ({ data: of({ facilityType: new FacilityType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FacilityTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FacilityTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FacilityTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load facilityType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.facilityType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
