import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ServiceEntryService } from 'app/entities/service-entry/service-entry.service';
import { IServiceEntry, ServiceEntry } from 'app/shared/model/service-entry.model';

describe('Service Tests', () => {
  describe('ServiceEntry Service', () => {
    let injector: TestBed;
    let service: ServiceEntryService;
    let httpMock: HttpTestingController;
    let elemDefault: IServiceEntry;
    let expectedResult: IServiceEntry | IServiceEntry[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ServiceEntryService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ServiceEntry(0, currentDate, currentDate, currentDate, currentDate, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            initiatedDate: currentDate.format(DATE_TIME_FORMAT),
            lastModifiedDate: currentDate.format(DATE_TIME_FORMAT),
            serviceStartDate: currentDate.format(DATE_TIME_FORMAT),
            serviceEndDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ServiceEntry', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            initiatedDate: currentDate.format(DATE_TIME_FORMAT),
            lastModifiedDate: currentDate.format(DATE_TIME_FORMAT),
            serviceStartDate: currentDate.format(DATE_TIME_FORMAT),
            serviceEndDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdDate: currentDate,
            initiatedDate: currentDate,
            lastModifiedDate: currentDate,
            serviceStartDate: currentDate,
            serviceEndDate: currentDate
          },
          returnedFromService
        );

        service.create(new ServiceEntry()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ServiceEntry', () => {
        const returnedFromService = Object.assign(
          {
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            initiatedDate: currentDate.format(DATE_TIME_FORMAT),
            lastModifiedDate: currentDate.format(DATE_TIME_FORMAT),
            serviceStartDate: currentDate.format(DATE_TIME_FORMAT),
            serviceEndDate: currentDate.format(DATE_TIME_FORMAT),
            entry: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdDate: currentDate,
            initiatedDate: currentDate,
            lastModifiedDate: currentDate,
            serviceStartDate: currentDate,
            serviceEndDate: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ServiceEntry', () => {
        const returnedFromService = Object.assign(
          {
            createdDate: currentDate.format(DATE_TIME_FORMAT),
            initiatedDate: currentDate.format(DATE_TIME_FORMAT),
            lastModifiedDate: currentDate.format(DATE_TIME_FORMAT),
            serviceStartDate: currentDate.format(DATE_TIME_FORMAT),
            serviceEndDate: currentDate.format(DATE_TIME_FORMAT),
            entry: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdDate: currentDate,
            initiatedDate: currentDate,
            lastModifiedDate: currentDate,
            serviceStartDate: currentDate,
            serviceEndDate: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ServiceEntry', () => {
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
