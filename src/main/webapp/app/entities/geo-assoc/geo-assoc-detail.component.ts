import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGeoAssoc } from 'app/shared/model/geo-assoc.model';

@Component({
  selector: 'sys-geo-assoc-detail',
  templateUrl: './geo-assoc-detail.component.html'
})
export class GeoAssocDetailComponent implements OnInit {
  geoAssoc: IGeoAssoc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ geoAssoc }) => (this.geoAssoc = geoAssoc));
  }

  previousState(): void {
    window.history.back();
  }
}
