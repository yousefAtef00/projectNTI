import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {

  private baseUrl = 'http://localhost:3000/checkout';

  constructor(private http: HttpClient) {}

  checkout() {
    return this.http.post(this.baseUrl, {});
  }
}