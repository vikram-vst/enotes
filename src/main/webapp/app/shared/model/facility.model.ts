import { IFacilityType } from 'app/shared/model/facility-type.model';
import { IProductStore } from 'app/shared/model/product-store.model';
import { IFacilityGroup } from 'app/shared/model/facility-group.model';
import { IUser } from 'app/core/user/user.model';

export interface IFacility {
  id?: number;
  name?: string;
  description?: string;
  facilityType?: IFacilityType;
  productStore?: IProductStore;
  facilityGroup?: IFacilityGroup;
  owner?: IUser;
}

export class Facility implements IFacility {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public facilityType?: IFacilityType,
    public productStore?: IProductStore,
    public facilityGroup?: IFacilityGroup,
    public owner?: IUser
  ) {}
}
