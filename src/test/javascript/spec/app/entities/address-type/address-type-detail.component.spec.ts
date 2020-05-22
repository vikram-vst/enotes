import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { AddressTypeDetailComponent } from 'app/entities/address-type/address-type-detail.component';
import { AddressType } from 'app/shared/model/address-type.model';

describe('Component Tests', () => {
  describe('AddressType Management Detail Component', () => {
    let comp: AddressTypeDetailComponent;
    let fixture: ComponentFixture<AddressTypeDetailComponent>;
    const route = ({ data: of({ addressType: new AddressType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [AddressTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AddressTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AddressTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load addressType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.addressType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
