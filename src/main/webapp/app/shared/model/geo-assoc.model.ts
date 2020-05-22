import { IGeo } from 'app/shared/model/geo.model';
import { IGeoAssocType } from 'app/shared/model/geo-assoc-type.model';

export interface IGeoAssoc {
  id?: number;
  geo?: IGeo;
  geoTo?: IGeo;
  geoAssocType?: IGeoAssocType;
}

export class GeoAssoc implements IGeoAssoc {
  constructor(public id?: number, public geo?: IGeo, public geoTo?: IGeo, public geoAssocType?: IGeoAssocType) {}
}
