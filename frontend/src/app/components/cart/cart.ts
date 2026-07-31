import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.loadCart();
  }

  increaseQuantity(productId: string, currentQuantity: number) {

    this.cartService
      .updateQuantity(productId, currentQuantity + 1)
      .subscribe({
        next: () => {
          this.cartService.loadCart();
        },

        error: (err) => {
          console.log(err);
        }
      });
  }

  decreaseQuantity(productId: string, currentQuantity: number) {

    if (currentQuantity === 1) {
      return;
    }

    this.cartService
      .updateQuantity(productId, currentQuantity - 1)
      .subscribe({
        next: () => {
          this.cartService.loadCart();
        },

        error: (err) => {
          console.log(err);
        }
      });
  }

  removeItem(productId: string) {

    this.cartService
      .removeFromCart(productId)
      .subscribe({
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
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    );
  }
}