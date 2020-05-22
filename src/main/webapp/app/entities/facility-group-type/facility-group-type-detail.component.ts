import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFacilityGroupType } from 'app/shared/model/facility-group-type.model';

@Component({
  selector: 'sys-facility-group-type-detail',
  templateUrl: './facility-group-type-detail.component.html'
})
export class FacilityGroupTypeDetailComponent implements OnInit {
  facilityGroupType: IFacilityGroupType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facilityGroupType }) => (this.facilityGroupType = facilityGroupType));
  }

  previousState(): void {
    window.history.back();
  }
}
