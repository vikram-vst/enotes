import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { GenderUpdateComponent } from 'app/entities/gender/gender-update.component';
import { GenderService } from 'app/entities/gender/gender.service';
import { Gender } from 'app/shared/model/gender.model';

describe('Component Tests', () => {
  describe('Gender Management Update Component', () => {
    let comp: GenderUpdateComponent;
    let fixture: ComponentFixture<GenderUpdateComponent>;
    let service: GenderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GenderUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GenderUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenderUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenderService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Gender(123);
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
        const entity = new Gender();
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
