import { Component, EventEmitter, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Iproduct } from '../../model/Iproduct';
import {
  form,
  maxLength,
  MaxLengthValidationError,
  minLength,
  required,
  FormField,
} from '@angular/forms/signals';
import { ProductDashboard } from '../product-dashboard/product-dashboard';
import { ProductService } from '../../service/product-service';
import { SnackbarService } from '../../service/snackbar-service';

@Component({
  imports: [
    MatFormField,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FormField,
  ],
  selector: 'app-product-form',
  styleUrl: './product-form.scss',
  templateUrl: './product-form.html',
})
export class ProductForm {
  constructor(
    private _productService: ProductService,
    private _snackbarService: SnackbarService,
  ) {
    this.patchProductData();
  }

  isInEditMode: boolean = false;
  editObj!: Iproduct;

  productModel = signal<Iproduct>({
    productId: 0,
    name: '',
    category: 'ELECTRONIC',
    price: '',
    expYear: 2026,
    isAvailable: true,
  });

  productForm = form(this.productModel, (control) => {
    required(control.name, { message: `name is required field..!` });
    minLength(control.name, 3, { message: `name must consist at least 3 letter..!` });
    maxLength(control.name, 20, { message: `name can't be more than 20 characters..!` });
    required(control.price, { message: `Enter product  price` });
  });

  addProduct(eve: Event) {
    eve.preventDefault();

    if (this.productForm().invalid()) {
      this.productForm().markAsTouched();
      return;
    }

    const NEW_OBJ: Iproduct = {
      ...this.productModel(),
      productId: Date.now(),
    };

    this._productService.addProduct(NEW_OBJ).subscribe({
      next: (data) => {
        this._snackbarService.openSnackBar(data.msg);
         this.productModel.set({
        productId: 0,
        name: '',
        category: 'ELECTRONIC',
        price: '',
        expYear: 2026,
        isAvailable: true,
      });
      this.productForm().reset();
      },
      error: (err) => {
        this._snackbarService.openSnackBar(err);
      },
    });
  }

  patchProductData() {
    this._productService.emitObj$.subscribe({
      next: (data) => {
        this.editObj = data;
        this.productModel.set({ ...data });
        this.isInEditMode = true;
      },
      error: (err) => {
        this._snackbarService.openSnackBar(err);
      },
    });
  }

  onUpdateProduct() {
    let UPDATE_OBJ: Iproduct = {
      ...this.productModel(),
      productId: this.editObj.productId,
    };
    this._productService.updateProduct(UPDATE_OBJ).subscribe({
      next: (data) => {
        this._snackbarService.openSnackBar(data.msg);
        this.isInEditMode = false;
         this.productModel.set({
        productId: 0,
        name: '',
        category: 'ELECTRONIC',
        price: '',
        expYear: 2026,
        isAvailable: true,
      });
      this.productForm().reset();
      },
      error: (err) => {
        this._snackbarService.openSnackBar(err);
      },
    });
  }
}
