import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IServiceEntry } from 'app/shared/model/service-entry.model';

@Component({
  selector: 'sys-service-entry-detail',
  templateUrl: './service-entry-detail.component.html'
})
export class ServiceEntryDetailComponent implements OnInit {
  serviceEntry: IServiceEntry | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceEntry }) => (this.serviceEntry = serviceEntry));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
