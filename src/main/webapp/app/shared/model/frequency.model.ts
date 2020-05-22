export interface IFrequency {
  id?: number;
  name?: string;
  description?: string;
}

export class Frequency implements IFrequency {
  constructor(public id?: number, public name?: string, public description?: string) {}
}
