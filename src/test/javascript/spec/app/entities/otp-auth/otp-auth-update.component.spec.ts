import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { OtpAuthUpdateComponent } from 'app/entities/otp-auth/otp-auth-update.component';
import { OtpAuthService } from 'app/entities/otp-auth/otp-auth.service';
import { OtpAuth } from 'app/shared/model/otp-auth.model';

describe('Component Tests', () => {
  describe('OtpAuth Management Update Component', () => {
    let comp: OtpAuthUpdateComponent;
    let fixture: ComponentFixture<OtpAuthUpdateComponent>;
    let service: OtpAuthService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [OtpAuthUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OtpAuthUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OtpAuthUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OtpAuthService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OtpAuth(123);
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
        const entity = new OtpAuth();
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
