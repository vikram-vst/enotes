import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { GeoAssocComponent } from 'app/entities/geo-assoc/geo-assoc.component';
import { GeoAssocService } from 'app/entities/geo-assoc/geo-assoc.service';
import { GeoAssoc } from 'app/shared/model/geo-assoc.model';

describe('Component Tests', () => {
  describe('GeoAssoc Management Component', () => {
    let comp: GeoAssocComponent;
    let fixture: ComponentFixture<GeoAssocComponent>;
    let service: GeoAssocService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoAssocComponent]
      })
        .overrideTemplate(GeoAssocComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GeoAssocComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GeoAssocService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GeoAssoc(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.geoAssocs && comp.geoAssocs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
