import { IStatus } from 'app/shared/model/status.model';
import { IGeo } from 'app/shared/model/geo.model';
import { IAddressType } from 'app/shared/model/address-type.model';
import { IGeoPoint } from 'app/shared/model/geo-point.model';
import { IUser } from 'app/core/user/user.model';

export interface IAddress {
  id?: number;
  streetAddress?: string;
  streetAddress2?: string;
  city?: string;
  landmark?: string;
  postalCode?: string;
  note?: string;
  isDefault?: boolean;
  customAddressType?: string;
  status?: IStatus;
  state?: IGeo;
  pincode?: IGeo;
  country?: IGeo;
  addressType?: IAddressType;
  geoPoint?: IGeoPoint;
  user?: IUser;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public streetAddress?: string,
    public streetAddress2?: string,
    public city?: string,
    public landmark?: string,
    public postalCode?: string,
    public note?: string,
    public isDefault?: boolean,
    public customAddressType?: string,
    public status?: IStatus,
    public state?: IGeo,
    public pincode?: IGeo,
    public country?: IGeo,
    public addressType?: IAddressType,
    public geoPoint?: IGeoPoint,
    public user?: IUser
  ) {
    this.isDefault = this.isDefault || false;
  }
}
