import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { OtpAuthService } from 'app/entities/otp-auth/otp-auth.service';
import { IOtpAuth, OtpAuth } from 'app/shared/model/otp-auth.model';

describe('Service Tests', () => {
  describe('OtpAuth Service', () => {
    let injector: TestBed;
    let service: OtpAuthService;
    let httpMock: HttpTestingController;
    let elemDefault: IOtpAuth;
    let expectedResult: IOtpAuth | IOtpAuth[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(OtpAuthService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new OtpAuth(0, 'AAAAAAA', false, false, false, currentDate, 0, 0, 0, 0, 0, 0, 0, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            otpSentTime: currentDate.format(DATE_TIME_FORMAT),
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            lastModifiedDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a OtpAuth', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            otpSentTime: currentDate.format(DATE_TIME_FORMAT),
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            lastModifiedDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            otpSentTime: currentDate,
            createdDate: currentDate,
            lastModifiedDate: currentDate
          },
          returnedFromService
        );

        service.create(new OtpAuth()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a OtpAuth', () => {
        const returnedFromService = Object.assign(
          {
            otp: 'BBBBBB',
            otpSent: true,
            verificationSuccess: true,
            otpExpired: true,
            otpSentTime: currentDate.format(DATE_TIME_FORMAT),
            sentCounter: 1,
            failCounter: 1,
            otpResetCounter: 1,
            maxResend: 1,
            maxReset: 1,
            maxFailures: 1,
            otpActiveTime: 1,
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            lastModifiedDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            otpSentTime: currentDate,
            createdDate: currentDate,
            lastModifiedDate: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of OtpAuth', () => {
        const returnedFromService = Object.assign(
          {
            otp: 'BBBBBB',
            otpSent: true,
            verificationSuccess: true,
            otpExpired: true,
            otpSentTime: currentDate.format(DATE_TIME_FORMAT),
            sentCounter: 1,
            failCounter: 1,
            otpResetCounter: 1,
            maxResend: 1,
            maxReset: 1,
            maxFailures: 1,
            otpActiveTime: 1,
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            lastModifiedDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            otpSentTime: currentDate,
            createdDate: currentDate,
            lastModifiedDate: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a OtpAuth', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
