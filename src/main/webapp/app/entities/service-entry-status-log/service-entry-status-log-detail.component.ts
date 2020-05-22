import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServiceEntryStatusLog } from 'app/shared/model/service-entry-status-log.model';

@Component({
  selector: 'sys-service-entry-status-log-detail',
  templateUrl: './service-entry-status-log-detail.component.html'
})
export class ServiceEntryStatusLogDetailComponent implements OnInit {
  serviceEntryStatusLog: IServiceEntryStatusLog | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceEntryStatusLog }) => (this.serviceEntryStatusLog = serviceEntryStatusLog));
  }

  previousState(): void {
    window.history.back();
  }
}
