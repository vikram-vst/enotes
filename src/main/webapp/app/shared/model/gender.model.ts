export interface IGender {
  id?: number;
  name?: string;
}

export class Gender implements IGender {
  constructor(public id?: number, public name?: string) {}
}
