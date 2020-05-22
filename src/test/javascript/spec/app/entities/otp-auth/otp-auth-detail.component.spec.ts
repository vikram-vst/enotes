import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { OtpAuthDetailComponent } from 'app/entities/otp-auth/otp-auth-detail.component';
import { OtpAuth } from 'app/shared/model/otp-auth.model';

describe('Component Tests', () => {
  describe('OtpAuth Management Detail Component', () => {
    let comp: OtpAuthDetailComponent;
    let fixture: ComponentFixture<OtpAuthDetailComponent>;
    const route = ({ data: of({ otpAuth: new OtpAuth(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [OtpAuthDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OtpAuthDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OtpAuthDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load otpAuth on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.otpAuth).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
