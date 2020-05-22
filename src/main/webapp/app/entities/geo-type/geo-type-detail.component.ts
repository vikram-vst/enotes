import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGeoType } from 'app/shared/model/geo-type.model';

@Component({
  selector: 'sys-geo-type-detail',
  templateUrl: './geo-type-detail.component.html'
})
export class GeoTypeDetailComponent implements OnInit {
  geoType: IGeoType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ geoType }) => (this.geoType = geoType));
  }

  previousState(): void {
    window.history.back();
  }
}
