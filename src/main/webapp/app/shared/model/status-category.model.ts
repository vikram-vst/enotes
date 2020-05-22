export interface IStatusCategory {
  id?: number;
  name?: string;
  description?: string;
}

export class StatusCategory implements IStatusCategory {
  constructor(public id?: number, public name?: string, public description?: string) {}
}
