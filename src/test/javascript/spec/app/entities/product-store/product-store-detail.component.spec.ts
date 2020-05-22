import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { ProductStoreDetailComponent } from 'app/entities/product-store/product-store-detail.component';
import { ProductStore } from 'app/shared/model/product-store.model';

describe('Component Tests', () => {
  describe('ProductStore Management Detail Component', () => {
    let comp: ProductStoreDetailComponent;
    let fixture: ComponentFixture<ProductStoreDetailComponent>;
    const route = ({ data: of({ productStore: new ProductStore(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ProductStoreDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductStoreDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductStoreDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productStore on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productStore).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
