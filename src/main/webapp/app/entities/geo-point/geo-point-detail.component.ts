import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGeoPoint } from 'app/shared/model/geo-point.model';

@Component({
  selector: 'sys-geo-point-detail',
  templateUrl: './geo-point-detail.component.html'
})
export class GeoPointDetailComponent implements OnInit {
  geoPoint: IGeoPoint | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ geoPoint }) => (this.geoPoint = geoPoint));
  }

  previousState(): void {
    window.history.back();
  }
}
