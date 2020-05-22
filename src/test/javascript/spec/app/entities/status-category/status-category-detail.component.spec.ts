import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { StatusCategoryDetailComponent } from 'app/entities/status-category/status-category-detail.component';
import { StatusCategory } from 'app/shared/model/status-category.model';

describe('Component Tests', () => {
  describe('StatusCategory Management Detail Component', () => {
    let comp: StatusCategoryDetailComponent;
    let fixture: ComponentFixture<StatusCategoryDetailComponent>;
    const route = ({ data: of({ statusCategory: new StatusCategory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [StatusCategoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StatusCategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StatusCategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load statusCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.statusCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
