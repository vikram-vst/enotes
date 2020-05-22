import { Moment } from 'moment';
import { IStatus } from 'app/shared/model/status.model';
import { IService } from 'app/shared/model/service.model';

export interface IServiceDefinition {
  id?: number;
  title?: string;
  version?: number;
  imagePath?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  fields?: any;
  status?: IStatus;
  service?: IService;
}

export class ServiceDefinition implements IServiceDefinition {
  constructor(
    public id?: number,
    public title?: string,
    public version?: number,
    public imagePath?: string,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public fields?: any,
    public status?: IStatus,
    public service?: IService
  ) {}
}
