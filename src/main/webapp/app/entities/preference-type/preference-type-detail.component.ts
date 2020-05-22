import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPreferenceType } from 'app/shared/model/preference-type.model';

@Component({
  selector: 'sys-preference-type-detail',
  templateUrl: './preference-type-detail.component.html'
})
export class PreferenceTypeDetailComponent implements OnInit {
  preferenceType: IPreferenceType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ preferenceType }) => (this.preferenceType = preferenceType));
  }

  previousState(): void {
    window.history.back();
  }
}
