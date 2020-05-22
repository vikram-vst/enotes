import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { GeoAssocTypeDetailComponent } from 'app/entities/geo-assoc-type/geo-assoc-type-detail.component';
import { GeoAssocType } from 'app/shared/model/geo-assoc-type.model';

describe('Component Tests', () => {
  describe('GeoAssocType Management Detail Component', () => {
    let comp: GeoAssocTypeDetailComponent;
    let fixture: ComponentFixture<GeoAssocTypeDetailComponent>;
    const route = ({ data: of({ geoAssocType: new GeoAssocType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoAssocTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GeoAssocTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GeoAssocTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load geoAssocType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.geoAssocType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
