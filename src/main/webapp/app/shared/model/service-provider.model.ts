import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IService } from 'app/shared/model/service.model';

export interface IServiceProvider {
  id?: number;
  fromDate?: Moment;
  thruDate?: Moment;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  user?: IUser;
  service?: IService;
}

export class ServiceProvider implements IServiceProvider {
  constructor(
    public id?: number,
    public fromDate?: Moment,
    public thruDate?: Moment,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public user?: IUser,
    public service?: IService
  ) {}
}
