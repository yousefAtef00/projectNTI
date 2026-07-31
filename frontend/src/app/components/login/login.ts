import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: Auth,
    private router: Router,
    private storage: StorageService
  ) {}

  errorMessage = '';

login() {
  this.authService.login(this.loginData).subscribe({
    next: (response: any) => {
      this.storage.setItem('token', response.token);
      this.authService.isLoggedIn.set(true);   
      this.router.navigate(['/products']);
    },
    error: (error) => {
      this.errorMessage = error.error.message;
    }
  });
}
}