import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { ProductService } from '../../services/products';
import { Producti } from '../../core/producti';
import { Product } from '../product/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Product, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  products: Producti[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }

  loadProducts() {

    this.productService.getProducts().subscribe({

      next: (res) => {
        console.log('Products:', res.Products);
        this.products = res.Products.slice(0, 8);
        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error(err);

      }

    });

  }
  ngOnInit(): void {
    this.loadProducts()
  }

}