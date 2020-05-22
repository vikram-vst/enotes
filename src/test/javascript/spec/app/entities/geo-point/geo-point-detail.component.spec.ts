import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { GeoPointDetailComponent } from 'app/entities/geo-point/geo-point-detail.component';
import { GeoPoint } from 'app/shared/model/geo-point.model';

describe('Component Tests', () => {
  describe('GeoPoint Management Detail Component', () => {
    let comp: GeoPointDetailComponent;
    let fixture: ComponentFixture<GeoPointDetailComponent>;
    const route = ({ data: of({ geoPoint: new GeoPoint(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoPointDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GeoPointDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GeoPointDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load geoPoint on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.geoPoint).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
