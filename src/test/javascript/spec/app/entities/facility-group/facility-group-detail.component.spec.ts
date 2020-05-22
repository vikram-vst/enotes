import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { FacilityGroupDetailComponent } from 'app/entities/facility-group/facility-group-detail.component';
import { FacilityGroup } from 'app/shared/model/facility-group.model';

describe('Component Tests', () => {
  describe('FacilityGroup Management Detail Component', () => {
    let comp: FacilityGroupDetailComponent;
    let fixture: ComponentFixture<FacilityGroupDetailComponent>;
    const route = ({ data: of({ facilityGroup: new FacilityGroup(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FacilityGroupDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FacilityGroupDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FacilityGroupDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load facilityGroup on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.facilityGroup).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
