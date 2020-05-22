import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { GeoPointComponent } from 'app/entities/geo-point/geo-point.component';
import { GeoPointService } from 'app/entities/geo-point/geo-point.service';
import { GeoPoint } from 'app/shared/model/geo-point.model';

describe('Component Tests', () => {
  describe('GeoPoint Management Component', () => {
    let comp: GeoPointComponent;
    let fixture: ComponentFixture<GeoPointComponent>;
    let service: GeoPointService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoPointComponent]
      })
        .overrideTemplate(GeoPointComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GeoPointComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GeoPointService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GeoPoint(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.geoPoints && comp.geoPoints[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
