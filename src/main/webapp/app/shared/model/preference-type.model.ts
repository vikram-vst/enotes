export interface IPreferenceType {
  id?: number;
  name?: string;
  description?: string;
}

export class PreferenceType implements IPreferenceType {
  constructor(public id?: number, public name?: string, public description?: string) {}
}
