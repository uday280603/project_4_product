import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../service/product-service';
import { Iproduct } from '../../model/Iproduct';
import { SnackbarService } from '../../service/snackbar-service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirm } from '../get-confirm/get-confirm';

@Component({
  imports: [MatButtonModule, MatCardModule],
  selector: 'app-products',
  styleUrl: './products.scss',
  templateUrl: './products.html',
})
export class Products {
  constructor(private _matDialog: MatDialog) {
    this.getAll();
  }

  _productService = inject(ProductService);
  _snackbarService = inject(SnackbarService);

  productData = signal<Iproduct[]>([]);
  products = this._productService.products;

  getAll() {
    this._productService.fetchAll().subscribe({
      next: (data) => {
        this.productData.set(data);
      },
      error: (err) => {
        this._snackbarService.openSnackBar(err);
      },
    });
  }

  onEditProduct(editObj: Iproduct) {
    this._productService.emitEditObj(editObj);
  }

  onRemoveProduct(removeId: number) {
    let config = new MatDialogConfig();
    config.disableClose = true;
    config.data = `Are you sure to remove the product with id ${removeId}..?`;
    config.width = '450px';
    let _matRef = this._matDialog.open(GetConfirm, config);
    _matRef.afterClosed().subscribe((flag) => {
      if (flag === true) {
        this._productService.removeProduct(removeId).subscribe({
          next: (data) => {
            this._snackbarService.openSnackBar(data.msg);
          },
          error: (err) => {
            this._snackbarService.openSnackBar(err);
          },
        });
      }
    });
  }
}
