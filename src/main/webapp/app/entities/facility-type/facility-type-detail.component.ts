import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFacilityType } from 'app/shared/model/facility-type.model';

@Component({
  selector: 'sys-facility-type-detail',
  templateUrl: './facility-type-detail.component.html'
})
export class FacilityTypeDetailComponent implements OnInit {
  facilityType: IFacilityType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facilityType }) => (this.facilityType = facilityType));
  }

  previousState(): void {
    window.history.back();
  }
}
