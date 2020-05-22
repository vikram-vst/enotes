import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { GeoAssocDetailComponent } from 'app/entities/geo-assoc/geo-assoc-detail.component';
import { GeoAssoc } from 'app/shared/model/geo-assoc.model';

describe('Component Tests', () => {
  describe('GeoAssoc Management Detail Component', () => {
    let comp: GeoAssocDetailComponent;
    let fixture: ComponentFixture<GeoAssocDetailComponent>;
    const route = ({ data: of({ geoAssoc: new GeoAssoc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoAssocDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GeoAssocDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GeoAssocDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load geoAssoc on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.geoAssoc).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
