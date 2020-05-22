import { IPreferenceType } from 'app/shared/model/preference-type.model';

export interface IPreference {
  id?: number;
  name?: string;
  preferenceType?: IPreferenceType;
}

export class Preference implements IPreference {
  constructor(public id?: number, public name?: string, public preferenceType?: IPreferenceType) {}
}
