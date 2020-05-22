import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { ServiceCategoryDetailComponent } from 'app/entities/service-category/service-category-detail.component';
import { ServiceCategory } from 'app/shared/model/service-category.model';

describe('Component Tests', () => {
  describe('ServiceCategory Management Detail Component', () => {
    let comp: ServiceCategoryDetailComponent;
    let fixture: ComponentFixture<ServiceCategoryDetailComponent>;
    const route = ({ data: of({ serviceCategory: new ServiceCategory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceCategoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ServiceCategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServiceCategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load serviceCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.serviceCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
