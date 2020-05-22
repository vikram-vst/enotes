import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { GeoAssocTypeUpdateComponent } from 'app/entities/geo-assoc-type/geo-assoc-type-update.component';
import { GeoAssocTypeService } from 'app/entities/geo-assoc-type/geo-assoc-type.service';
import { GeoAssocType } from 'app/shared/model/geo-assoc-type.model';

describe('Component Tests', () => {
  describe('GeoAssocType Management Update Component', () => {
    let comp: GeoAssocTypeUpdateComponent;
    let fixture: ComponentFixture<GeoAssocTypeUpdateComponent>;
    let service: GeoAssocTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoAssocTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GeoAssocTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GeoAssocTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GeoAssocTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GeoAssocType(123);
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
        const entity = new GeoAssocType();
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
