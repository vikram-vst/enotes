import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { GeoComponent } from 'app/entities/geo/geo.component';
import { GeoService } from 'app/entities/geo/geo.service';
import { Geo } from 'app/shared/model/geo.model';

describe('Component Tests', () => {
  describe('Geo Management Component', () => {
    let comp: GeoComponent;
    let fixture: ComponentFixture<GeoComponent>;
    let service: GeoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoComponent]
      })
        .overrideTemplate(GeoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GeoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GeoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Geo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.geos && comp.geos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
