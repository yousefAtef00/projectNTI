import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  isLoggedIn = signal(false);

  constructor(private http: HttpClient, private storage: StorageService) {
    const token = this.storage.getItem('token');
    this.isLoggedIn.set(!!token);
  }

  register(data: any) {
    return this.http.post('http://localhost:3000/users/signup', data);
  }

  login(data: any) {
    return this.http.post('http://localhost:3000/users/login', data);
  }
}