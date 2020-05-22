import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { GeoAssocUpdateComponent } from 'app/entities/geo-assoc/geo-assoc-update.component';
import { GeoAssocService } from 'app/entities/geo-assoc/geo-assoc.service';
import { GeoAssoc } from 'app/shared/model/geo-assoc.model';

describe('Component Tests', () => {
  describe('GeoAssoc Management Update Component', () => {
    let comp: GeoAssocUpdateComponent;
    let fixture: ComponentFixture<GeoAssocUpdateComponent>;
    let service: GeoAssocService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoAssocUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GeoAssocUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GeoAssocUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GeoAssocService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GeoAssoc(123);
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
        const entity = new GeoAssoc();
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
