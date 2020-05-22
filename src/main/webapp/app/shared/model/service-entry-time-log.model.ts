import { Moment } from 'moment';
import { IServiceEntry } from 'app/shared/model/service-entry.model';
import { IUser } from 'app/core/user/user.model';

export interface IServiceEntryTimeLog {
  id?: number;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  serviceEntry?: IServiceEntry;
  modifiedBy?: IUser;
  createdBy?: IUser;
}

export class ServiceEntryTimeLog implements IServiceEntryTimeLog {
  constructor(
    public id?: number,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public serviceEntry?: IServiceEntry,
    public modifiedBy?: IUser,
    public createdBy?: IUser
  ) {}
}
