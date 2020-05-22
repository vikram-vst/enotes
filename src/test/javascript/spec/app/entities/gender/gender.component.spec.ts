import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { GenderComponent } from 'app/entities/gender/gender.component';
import { GenderService } from 'app/entities/gender/gender.service';
import { Gender } from 'app/shared/model/gender.model';

describe('Component Tests', () => {
  describe('Gender Management Component', () => {
    let comp: GenderComponent;
    let fixture: ComponentFixture<GenderComponent>;
    let service: GenderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [GenderComponent]
      })
        .overrideTemplate(GenderComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenderComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenderService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Gender(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.genders && comp.genders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
