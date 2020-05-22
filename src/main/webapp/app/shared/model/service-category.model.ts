import { Moment } from 'moment';

export interface IServiceCategory {
  id?: number;
  title?: string;
  sequenceNo?: number;
  parentCategory?: number;
  imagePath?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
}

export class ServiceCategory implements IServiceCategory {
  constructor(
    public id?: number,
    public title?: string,
    public sequenceNo?: number,
    public parentCategory?: number,
    public imagePath?: string,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment
  ) {}
}
