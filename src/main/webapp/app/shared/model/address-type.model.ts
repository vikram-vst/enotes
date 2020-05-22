export interface IAddressType {
  id?: number;
  name?: string;
}

export class AddressType implements IAddressType {
  constructor(public id?: number, public name?: string) {}
}
