import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IStatus } from 'app/shared/model/status.model';
import { IServiceDefinition } from 'app/shared/model/service-definition.model';
import { IGeoPoint } from 'app/shared/model/geo-point.model';
import { IAddress } from 'app/shared/model/address.model';

export interface IServiceEntry {
  id?: number;
  createdDate?: Moment;
  initiatedDate?: Moment;
  lastModifiedDate?: Moment;
  serviceStartDate?: Moment;
  serviceEndDate?: Moment;
  entry?: any;
  user?: IUser;
  status?: IStatus;
  serviceDefinition?: IServiceDefinition;
  geoPoint?: IGeoPoint;
  address?: IAddress;
}

export class ServiceEntry implements IServiceEntry {
  constructor(
    public id?: number,
    public createdDate?: Moment,
    public initiatedDate?: Moment,
    public lastModifiedDate?: Moment,
    public serviceStartDate?: Moment,
    public serviceEndDate?: Moment,
    public entry?: any,
    public user?: IUser,
    public status?: IStatus,
    public serviceDefinition?: IServiceDefinition,
    public geoPoint?: IGeoPoint,
    public address?: IAddress
  ) {}
}
