import { IUser } from 'app/core/user/user.model';
import { IFacility } from 'app/shared/model/facility.model';

export interface IFacilityUser {
  id?: number;
  name?: string;
  user?: IUser;
  facility?: IFacility;
}

export class FacilityUser implements IFacilityUser {
  constructor(public id?: number, public name?: string, public user?: IUser, public facility?: IFacility) {}
}
