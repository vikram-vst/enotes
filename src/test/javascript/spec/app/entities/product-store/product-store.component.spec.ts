import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { ProductStoreComponent } from 'app/entities/product-store/product-store.component';
import { ProductStoreService } from 'app/entities/product-store/product-store.service';
import { ProductStore } from 'app/shared/model/product-store.model';

describe('Component Tests', () => {
  describe('ProductStore Management Component', () => {
    let comp: ProductStoreComponent;
    let fixture: ComponentFixture<ProductStoreComponent>;
    let service: ProductStoreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ProductStoreComponent]
      })
        .overrideTemplate(ProductStoreComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductStoreComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductStoreService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductStore(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productStores && comp.productStores[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
