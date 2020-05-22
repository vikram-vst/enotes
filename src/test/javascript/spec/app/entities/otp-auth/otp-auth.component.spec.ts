import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EnotesTestModule } from '../../../test.module';
import { OtpAuthComponent } from 'app/entities/otp-auth/otp-auth.component';
import { OtpAuthService } from 'app/entities/otp-auth/otp-auth.service';
import { OtpAuth } from 'app/shared/model/otp-auth.model';

describe('Component Tests', () => {
  describe('OtpAuth Management Component', () => {
    let comp: OtpAuthComponent;
    let fixture: ComponentFixture<OtpAuthComponent>;
    let service: OtpAuthService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [OtpAuthComponent]
      })
        .overrideTemplate(OtpAuthComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OtpAuthComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OtpAuthService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OtpAuth(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.otpAuths && comp.otpAuths[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
