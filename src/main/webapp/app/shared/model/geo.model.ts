import { IGeoType } from 'app/shared/model/geo-type.model';

export interface IGeo {
  id?: number;
  name?: string;
  code?: string;
  abbreviation?: string;
  geoType?: IGeoType;
}

export class Geo implements IGeo {
  constructor(public id?: number, public name?: string, public code?: string, public abbreviation?: string, public geoType?: IGeoType) {}
}
