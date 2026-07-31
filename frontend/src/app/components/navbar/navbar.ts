import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Auth } from '../../services/auth';
import { StorageService } from '../../services/storage.service';
import { CartService } from '../../services/cart';

@Component({ selector: 'app-navbar', 
  imports: [RouterLink, RouterLinkActive], 
  templateUrl: './navbar.html', 
  styleUrl: './navbar.css', }) 
export class Navbar {
   constructor(public authService: Auth, private storage: StorageService,public cartService:CartService) { } 
   logout() { this.storage.removeItem('token'); 
     this.cartService.clearCart();
    this.authService.isLoggedIn.set(false); 
  } 
  }