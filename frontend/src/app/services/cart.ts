import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Producti } from '../core/producti';

export interface CartItem {
  product: Producti;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:3000/cart';
  cartItems = signal<CartItem[]>([]);

  constructor(private http: HttpClient) { }

  getCart() {
    return this.http.get<{ message: string; cart?: { products: CartItem[] } }>(this.baseUrl);
  }

  addToCart(productId: string, quantity: number = 1) {
    return this.http.post(this.baseUrl, { product: productId, quantity });
  }

  removeFromCart(productId: string) {
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }
  getCartCount(): number {
    return this.cartItems().reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  updateQuantity(productId: string, quantity: number) {
    return this.http.put(
      `${this.baseUrl}/${productId}`,
      { quantity }
    );
  }
  clearCart() {
    this.cartItems.set([]);
  }
  loadCart() {
    this.getCart().subscribe({
      next: (res) => {
        this.cartItems.set(res.cart?.products ?? []);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}