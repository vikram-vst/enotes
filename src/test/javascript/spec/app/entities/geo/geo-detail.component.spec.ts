import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { GeoDetailComponent } from 'app/entities/geo/geo-detail.component';
import { Geo } from 'app/shared/model/geo.model';

describe('Component Tests', () => {
  describe('Geo Management Detail Component', () => {
    let comp: GeoDetailComponent;
    let fixture: ComponentFixture<GeoDetailComponent>;
    const route = ({ data: of({ geo: new Geo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GeoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GeoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load geo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.geo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
