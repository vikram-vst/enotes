import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGender } from 'app/shared/model/gender.model';

@Component({
  selector: 'sys-gender-detail',
  templateUrl: './gender-detail.component.html'
})
export class GenderDetailComponent implements OnInit {
  gender: IGender | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gender }) => (this.gender = gender));
  }

  previousState(): void {
    window.history.back();
  }
}
