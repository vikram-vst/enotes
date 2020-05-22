import { IFacilityGroupType } from 'app/shared/model/facility-group-type.model';

export interface IFacilityGroup {
  id?: number;
  name?: string;
  facilityGroupType?: IFacilityGroupType;
}

export class FacilityGroup implements IFacilityGroup {
  constructor(public id?: number, public name?: string, public facilityGroupType?: IFacilityGroupType) {}
}
