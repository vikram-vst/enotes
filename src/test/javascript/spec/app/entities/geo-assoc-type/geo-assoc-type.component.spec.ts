import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { GeoAssocTypeComponent } from 'app/entities/geo-assoc-type/geo-assoc-type.component';
import { GeoAssocTypeService } from 'app/entities/geo-assoc-type/geo-assoc-type.service';
import { GeoAssocType } from 'app/shared/model/geo-assoc-type.model';

describe('Component Tests', () => {
  describe('GeoAssocType Management Component', () => {
    let comp: GeoAssocTypeComponent;
    let fixture: ComponentFixture<GeoAssocTypeComponent>;
    let service: GeoAssocTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoAssocTypeComponent]
      })
        .overrideTemplate(GeoAssocTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GeoAssocTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GeoAssocTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GeoAssocType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.geoAssocTypes && comp.geoAssocTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
