import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart';
import { CheckoutService } from '../../services/checkoutService';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {

  constructor(
    public cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.loadCart();
  }

  getTotal(): number {

    return this.cartService.cartItems().reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    );
  }

  placeOrder() {

    this.checkoutService.checkout().subscribe({

      next: (res) => {

        console.log(res);

        this.cartService.clearCart();

        this.router.navigate(['/home']);

      },

      error: (err) => {

        console.log(err);

      }

    });

  }
}