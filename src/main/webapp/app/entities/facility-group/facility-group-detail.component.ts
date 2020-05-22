import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFacilityGroup } from 'app/shared/model/facility-group.model';

@Component({
  selector: 'sys-facility-group-detail',
  templateUrl: './facility-group-detail.component.html'
})
export class FacilityGroupDetailComponent implements OnInit {
  facilityGroup: IFacilityGroup | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facilityGroup }) => (this.facilityGroup = facilityGroup));
  }

  previousState(): void {
    window.history.back();
  }
}
