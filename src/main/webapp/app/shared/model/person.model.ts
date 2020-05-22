import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IStatus } from 'app/shared/model/status.model';
import { ILanguage } from 'app/shared/model/language.model';
import { IGender } from 'app/shared/model/gender.model';

export interface IPerson {
  id?: number;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  profilePictureContentType?: string;
  profilePicture?: any;
  email?: string;
  birthdate?: Moment;
  notes?: string;
  mobileNumber?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  user?: IUser;
  status?: IStatus;
  preferredLanguage?: ILanguage;
  gender?: IGender;
}

export class Person implements IPerson {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public displayName?: string,
    public profilePictureContentType?: string,
    public profilePicture?: any,
    public email?: string,
    public birthdate?: Moment,
    public notes?: string,
    public mobileNumber?: string,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public user?: IUser,
    public status?: IStatus,
    public preferredLanguage?: ILanguage,
    public gender?: IGender
  ) {}
}
