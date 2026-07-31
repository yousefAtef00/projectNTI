import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producti } from '../core/producti';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<{ message: string; Products: Producti[] }>(this.baseUrl);
  }

}