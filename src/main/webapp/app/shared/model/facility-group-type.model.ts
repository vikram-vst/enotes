export interface IFacilityGroupType {
  id?: number;
  name?: string;
  description?: string;
}

export class FacilityGroupType implements IFacilityGroupType {
  constructor(public id?: number, public name?: string, public description?: string) {}
}
