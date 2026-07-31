import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../product/product';
import { Producti } from '../../core/producti';
import { ProductService } from '../../services/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [Product],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  products: Producti[] = [];

  constructor(
    private _productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  getData() {
    this._productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.Products;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}