import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { GeoUpdateComponent } from 'app/entities/geo/geo-update.component';
import { GeoService } from 'app/entities/geo/geo.service';
import { Geo } from 'app/shared/model/geo.model';

describe('Component Tests', () => {
  describe('Geo Management Update Component', () => {
    let comp: GeoUpdateComponent;
    let fixture: ComponentFixture<GeoUpdateComponent>;
    let service: GeoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GeoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GeoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GeoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Geo(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Geo();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
