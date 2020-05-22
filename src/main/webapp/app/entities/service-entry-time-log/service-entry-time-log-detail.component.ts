import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServiceEntryTimeLog } from 'app/shared/model/service-entry-time-log.model';

@Component({
  selector: 'sys-service-entry-time-log-detail',
  templateUrl: './service-entry-time-log-detail.component.html'
})
export class ServiceEntryTimeLogDetailComponent implements OnInit {
  serviceEntryTimeLog: IServiceEntryTimeLog | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceEntryTimeLog }) => (this.serviceEntryTimeLog = serviceEntryTimeLog));
  }

  previousState(): void {
    window.history.back();
  }
}
