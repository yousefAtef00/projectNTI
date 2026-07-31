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

  createProduct(data: Producti) {
    return this.http.post(this.baseUrl, data);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateProduct(id: string, data: Partial<Producti>) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}