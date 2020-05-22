import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductStore, ProductStore } from 'app/shared/model/product-store.model';
import { ProductStoreService } from './product-store.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'sys-product-store-update',
  templateUrl: './product-store-update.component.html'
})
export class ProductStoreUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.maxLength(25)]],
    title: [null, [Validators.maxLength(25)]],
    owner: []
  });

  constructor(
    protected productStoreService: ProductStoreService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productStore }) => {
      this.updateForm(productStore);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(productStore: IProductStore): void {
    this.editForm.patchValue({
      id: productStore.id,
      name: productStore.name,
      title: productStore.title,
      owner: productStore.owner
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productStore = this.createFromForm();
    if (productStore.id !== undefined) {
      this.subscribeToSaveResponse(this.productStoreService.update(productStore));
    } else {
      this.subscribeToSaveResponse(this.productStoreService.create(productStore));
    }
  }

  private createFromForm(): IProductStore {
    return {
      ...new ProductStore(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      title: this.editForm.get(['title'])!.value,
      owner: this.editForm.get(['owner'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductStore>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
