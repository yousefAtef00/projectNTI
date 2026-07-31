import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.loadCart();
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        this.cartService.loadCart();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getTotal(): number {
    return this.cartService.cartItems().reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 0
    );
  }
}