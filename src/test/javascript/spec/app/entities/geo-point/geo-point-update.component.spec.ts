import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { GeoPointUpdateComponent } from 'app/entities/geo-point/geo-point-update.component';
import { GeoPointService } from 'app/entities/geo-point/geo-point.service';
import { GeoPoint } from 'app/shared/model/geo-point.model';

describe('Component Tests', () => {
  describe('GeoPoint Management Update Component', () => {
    let comp: GeoPointUpdateComponent;
    let fixture: ComponentFixture<GeoPointUpdateComponent>;
    let service: GeoPointService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GeoPointUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GeoPointUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GeoPointUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GeoPointService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GeoPoint(123);
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
        const entity = new GeoPoint();
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
