import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServiceCategory } from 'app/shared/model/service-category.model';

@Component({
  selector: 'sys-service-category-detail',
  templateUrl: './service-category-detail.component.html'
})
export class ServiceCategoryDetailComponent implements OnInit {
  serviceCategory: IServiceCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceCategory }) => (this.serviceCategory = serviceCategory));
  }

  previousState(): void {
    window.history.back();
  }
}
