import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { ProductStoreUpdateComponent } from 'app/entities/product-store/product-store-update.component';
import { ProductStoreService } from 'app/entities/product-store/product-store.service';
import { ProductStore } from 'app/shared/model/product-store.model';

describe('Component Tests', () => {
  describe('ProductStore Management Update Component', () => {
    let comp: ProductStoreUpdateComponent;
    let fixture: ComponentFixture<ProductStoreUpdateComponent>;
    let service: ProductStoreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ProductStoreUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductStoreUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductStoreUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductStoreService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductStore(123);
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
        const entity = new ProductStore();
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
