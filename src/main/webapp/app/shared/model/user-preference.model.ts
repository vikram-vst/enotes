import { IPreference } from 'app/shared/model/preference.model';
import { IUser } from 'app/core/user/user.model';

export interface IUserPreference {
  id?: number;
  name?: string;
  description?: string;
  preference?: IPreference;
  user?: IUser;
}

export class UserPreference implements IUserPreference {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public preference?: IPreference,
    public user?: IUser
  ) {}
}
