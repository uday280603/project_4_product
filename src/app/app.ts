import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductDashboard } from './shared/component/product-dashboard/product-dashboard';

@Component({
  imports: [ProductDashboard],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('project_4_product');
}
