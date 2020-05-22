import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { GeoTypeUpdateComponent } from 'app/entities/geo-type/geo-type-update.component';
import { GeoTypeService } from 'app/entities/geo-type/geo-type.service';
import { GeoType } from 'app/shared/model/geo-type.model';

describe('Component Tests', () => {
  describe('GeoType Management Update Component', () => {
    let comp: GeoTypeUpdateComponent;
    let fixture: ComponentFixture<GeoTypeUpdateComponent>;
    let service: GeoTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GeoTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GeoTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GeoTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GeoType(123);
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
        const entity = new GeoType();
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
