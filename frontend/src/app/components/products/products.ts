import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../product/product';
import { Producti } from '../../core/producti';
import { ProductService } from '../../services/products';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [Product,FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  products: Producti[] = [];
searchName: string = '';
maxPrice: number | null = null;
filteredProducts: Producti[] = [];
  constructor(
    private _productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

 getData() {
  this._productService.getProducts().subscribe({
    next: (data) => {

      this.products = data.Products;

      this.filteredProducts = data.Products;

      this.cdr.detectChanges();

    },

    error: (err) => {
      console.error('Error loading products:', err);
    }
  });
}
  filterProducts() {

  this.filteredProducts = this.products.filter(product => {

    const matchesName =
      product.title
        .toLowerCase()
        .includes(this.searchName.toLowerCase());

    const matchesPrice =
      this.maxPrice === null ||
      product.price <= this.maxPrice;

    return matchesName && matchesPrice;

  });

}
  ngOnInit(): void {
    this.getData();
  }
}