import { Component } from '@angular/core';
import { ProductForm } from '../product-form/product-form';
import { Products } from '../products/products';

@Component({
  imports: [ProductForm, Products],
  selector: 'app-product-dashboard',
  styleUrl: './product-dashboard.scss',
  templateUrl: './product-dashboard.html',
})
export class ProductDashboard {}
