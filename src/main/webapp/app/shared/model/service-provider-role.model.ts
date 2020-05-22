import { Moment } from 'moment';

export interface IServiceProviderRole {
  id?: number;
  name?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
}

export class ServiceProviderRole implements IServiceProviderRole {
  constructor(public id?: number, public name?: string, public createdDate?: Moment, public lastModifiedDate?: Moment) {}
}
