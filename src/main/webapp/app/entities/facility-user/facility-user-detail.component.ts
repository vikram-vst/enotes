import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFacilityUser } from 'app/shared/model/facility-user.model';

@Component({
  selector: 'sys-facility-user-detail',
  templateUrl: './facility-user-detail.component.html'
})
export class FacilityUserDetailComponent implements OnInit {
  facilityUser: IFacilityUser | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facilityUser }) => (this.facilityUser = facilityUser));
  }

  previousState(): void {
    window.history.back();
  }
}
