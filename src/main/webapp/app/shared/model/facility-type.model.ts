export interface IFacilityType {
  id?: number;
  name?: string;
  description?: string;
}

export class FacilityType implements IFacilityType {
  constructor(public id?: number, public name?: string, public description?: string) {}
}
