import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IServiceEntryStatusLog {
  id?: number;
  createdDate?: Moment;
  modifiedBy?: IUser;
}

export class ServiceEntryStatusLog implements IServiceEntryStatusLog {
  constructor(public id?: number, public createdDate?: Moment, public modifiedBy?: IUser) {}
}
