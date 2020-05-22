import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGeoAssocType } from 'app/shared/model/geo-assoc-type.model';

@Component({
  selector: 'sys-geo-assoc-type-detail',
  templateUrl: './geo-assoc-type-detail.component.html'
})
export class GeoAssocTypeDetailComponent implements OnInit {
  geoAssocType: IGeoAssocType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ geoAssocType }) => (this.geoAssocType = geoAssocType));
  }

  previousState(): void {
    window.history.back();
  }
}
