import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGeo } from 'app/shared/model/geo.model';

@Component({
  selector: 'sys-geo-detail',
  templateUrl: './geo-detail.component.html'
})
export class GeoDetailComponent implements OnInit {
  geo: IGeo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ geo }) => (this.geo = geo));
  }

  previousState(): void {
    window.history.back();
  }
}
