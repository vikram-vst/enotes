export interface IGeoType {
  id?: number;
  name?: string;
}

export class GeoType implements IGeoType {
  constructor(public id?: number, public name?: string) {}
}
