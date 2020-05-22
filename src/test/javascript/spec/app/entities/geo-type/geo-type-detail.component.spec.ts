import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { GeoTypeDetailComponent } from 'app/entities/geo-type/geo-type-detail.component';
import { GeoType } from 'app/shared/model/geo-type.model';

describe('Component Tests', () => {
  describe('GeoType Management Detail Component', () => {
    let comp: GeoTypeDetailComponent;
    let fixture: ComponentFixture<GeoTypeDetailComponent>;
    const route = ({ data: of({ geoType: new GeoType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GeoTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GeoTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load geoType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.geoType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
