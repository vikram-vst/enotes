import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { GeoTypeComponent } from 'app/entities/geo-type/geo-type.component';
import { GeoTypeService } from 'app/entities/geo-type/geo-type.service';
import { GeoType } from 'app/shared/model/geo-type.model';

describe('Component Tests', () => {
  describe('GeoType Management Component', () => {
    let comp: GeoTypeComponent;
    let fixture: ComponentFixture<GeoTypeComponent>;
    let service: GeoTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoTypeComponent]
      })
        .overrideTemplate(GeoTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GeoTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GeoTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GeoType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.geoTypes && comp.geoTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
