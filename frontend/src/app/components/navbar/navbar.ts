import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Auth } from '../../services/auth';
import { StorageService } from '../../services/storage.service';

@Component({ selector: 'app-navbar', 
  imports: [RouterLink, RouterLinkActive], 
  templateUrl: './navbar.html', 
  styleUrl: './navbar.css', }) 
export class Navbar {
   constructor(public authService: Auth, private storage: StorageService) { } 
   logout() { this.storage.removeItem('token'); 
    this.authService.isLoggedIn.set(false); } 
  }