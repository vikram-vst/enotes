import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServiceFacility } from 'app/shared/model/service-facility.model';

@Component({
  selector: 'sys-service-facility-detail',
  templateUrl: './service-facility-detail.component.html'
})
export class ServiceFacilityDetailComponent implements OnInit {
  serviceFacility: IServiceFacility | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceFacility }) => (this.serviceFacility = serviceFacility));
  }

  previousState(): void {
    window.history.back();
  }
}
