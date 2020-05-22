import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { AddressTypeUpdateComponent } from 'app/entities/address-type/address-type-update.component';
import { AddressTypeService } from 'app/entities/address-type/address-type.service';
import { AddressType } from 'app/shared/model/address-type.model';

describe('Component Tests', () => {
  describe('AddressType Management Update Component', () => {
    let comp: AddressTypeUpdateComponent;
    let fixture: ComponentFixture<AddressTypeUpdateComponent>;
    let service: AddressTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [AddressTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AddressTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AddressTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AddressTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AddressType(123);
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
        const entity = new AddressType();
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
