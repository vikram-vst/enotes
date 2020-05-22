export interface IGeoPoint {
  id?: number;
  latitude?: number;
  longitude?: number;
}

export class GeoPoint implements IGeoPoint {
  constructor(public id?: number, public latitude?: number, public longitude?: number) {}
}
