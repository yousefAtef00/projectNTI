import { Component, Input, signal } from '@angular/core';
import { Producti } from '../../core/producti';
import { Auth } from '../../services/auth';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {

  @Input() product!: Producti;

  showLoginMessage = signal(false);

  constructor(private authService: Auth, private cartService: CartService) {}

  addToCart() {
    if (!this.authService.isLoggedIn()) {
      this.showLoginMessage.set(true);
      return;
    }

    this.showLoginMessage.set(false);

    this.cartService.addToCart(this.product._id!, 1).subscribe({
      next: () => {
        this.cartService.loadCart();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}