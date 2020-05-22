import { IUser } from 'app/core/user/user.model';

export interface IProductStore {
  id?: number;
  name?: string;
  title?: string;
  owner?: IUser;
}

export class ProductStore implements IProductStore {
  constructor(public id?: number, public name?: string, public title?: string, public owner?: IUser) {}
}
