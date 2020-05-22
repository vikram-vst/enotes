import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserPreference } from 'app/shared/model/user-preference.model';

@Component({
  selector: 'sys-user-preference-detail',
  templateUrl: './user-preference-detail.component.html'
})
export class UserPreferenceDetailComponent implements OnInit {
  userPreference: IUserPreference | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userPreference }) => (this.userPreference = userPreference));
  }

  previousState(): void {
    window.history.back();
  }
}
