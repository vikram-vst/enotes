import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { AddressTypeComponent } from 'app/entities/address-type/address-type.component';
import { AddressTypeService } from 'app/entities/address-type/address-type.service';
import { AddressType } from 'app/shared/model/address-type.model';

describe('Component Tests', () => {
  describe('AddressType Management Component', () => {
    let comp: AddressTypeComponent;
    let fixture: ComponentFixture<AddressTypeComponent>;
    let service: AddressTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [AddressTypeComponent]
      })
        .overrideTemplate(AddressTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AddressTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AddressTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AddressType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.addressTypes && comp.addressTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
