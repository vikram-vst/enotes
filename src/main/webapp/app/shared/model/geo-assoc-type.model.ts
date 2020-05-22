export interface IGeoAssocType {
  id?: number;
  name?: string;
}

export class GeoAssocType implements IGeoAssocType {
  constructor(public id?: number, public name?: string) {}
}
