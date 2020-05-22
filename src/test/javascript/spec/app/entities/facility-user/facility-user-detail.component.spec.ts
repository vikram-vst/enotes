import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { FacilityUserDetailComponent } from 'app/entities/facility-user/facility-user-detail.component';
import { FacilityUser } from 'app/shared/model/facility-user.model';

describe('Component Tests', () => {
  describe('FacilityUser Management Detail Component', () => {
    let comp: FacilityUserDetailComponent;
    let fixture: ComponentFixture<FacilityUserDetailComponent>;
    const route = ({ data: of({ facilityUser: new FacilityUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [FacilityUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FacilityUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FacilityUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load facilityUser on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.facilityUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
