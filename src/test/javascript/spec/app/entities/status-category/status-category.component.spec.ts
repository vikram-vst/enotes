import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { StatusCategoryComponent } from 'app/entities/status-category/status-category.component';
import { StatusCategoryService } from 'app/entities/status-category/status-category.service';
import { StatusCategory } from 'app/shared/model/status-category.model';

describe('Component Tests', () => {
  describe('StatusCategory Management Component', () => {
    let comp: StatusCategoryComponent;
    let fixture: ComponentFixture<StatusCategoryComponent>;
    let service: StatusCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [StatusCategoryComponent]
      })
        .overrideTemplate(StatusCategoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StatusCategoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatusCategoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StatusCategory(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.statusCategories && comp.statusCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
