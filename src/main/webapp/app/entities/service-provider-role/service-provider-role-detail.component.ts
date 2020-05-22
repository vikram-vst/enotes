import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServiceProviderRole } from 'app/shared/model/service-provider-role.model';

@Component({
  selector: 'sys-service-provider-role-detail',
  templateUrl: './service-provider-role-detail.component.html'
})
export class ServiceProviderRoleDetailComponent implements OnInit {
  serviceProviderRole: IServiceProviderRole | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceProviderRole }) => (this.serviceProviderRole = serviceProviderRole));
  }

  previousState(): void {
    window.history.back();
  }
}
