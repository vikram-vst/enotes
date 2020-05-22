import { Moment } from 'moment';
import { IServiceCategory } from 'app/shared/model/service-category.model';
import { IFrequency } from 'app/shared/model/frequency.model';

export interface IService {
  id?: number;
  title?: string;
  sequenceNo?: number;
  startTime?: number;
  endTime?: number;
  startDate?: Moment;
  endDate?: Moment;
  recurrence?: number;
  interval?: number;
  gracePeriod?: number;
  imagePath?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  category?: IServiceCategory;
  frequency?: IFrequency;
}

export class Service implements IService {
  constructor(
    public id?: number,
    public title?: string,
    public sequenceNo?: number,
    public startTime?: number,
    public endTime?: number,
    public startDate?: Moment,
    public endDate?: Moment,
    public recurrence?: number,
    public interval?: number,
    public gracePeriod?: number,
    public imagePath?: string,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public category?: IServiceCategory,
    public frequency?: IFrequency
  ) {}
}
