import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { FacilityGroupTypeDetailComponent } from 'app/entities/facility-group-type/facility-group-type-detail.component';
import { FacilityGroupType } from 'app/shared/model/facility-group-type.model';

describe('Component Tests', () => {
  describe('FacilityGroupType Management Detail Component', () => {
    let comp: FacilityGroupTypeDetailComponent;
    let fixture: ComponentFixture<FacilityGroupTypeDetailComponent>;
    const route = ({ data: of({ facilityGroupType: new FacilityGroupType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FacilityGroupTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FacilityGroupTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FacilityGroupTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load facilityGroupType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.facilityGroupType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
