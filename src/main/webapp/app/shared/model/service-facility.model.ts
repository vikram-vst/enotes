import { Moment } from 'moment';
import { IFrequency } from 'app/shared/model/frequency.model';

export interface IServiceFacility {
  id?: number;
  fromDate?: Moment;
  thruDate?: Moment;
  startTime?: number;
  endTime?: number;
  startDate?: Moment;
  endDate?: Moment;
  recurrence?: number;
  interval?: number;
  gracePeriod?: number;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  frequency?: IFrequency;
}

export class ServiceFacility implements IServiceFacility {
  constructor(
    public id?: number,
    public fromDate?: Moment,
    public thruDate?: Moment,
    public startTime?: number,
    public endTime?: number,
    public startDate?: Moment,
    public endDate?: Moment,
    public recurrence?: number,
    public interval?: number,
    public gracePeriod?: number,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public frequency?: IFrequency
  ) {}
}
