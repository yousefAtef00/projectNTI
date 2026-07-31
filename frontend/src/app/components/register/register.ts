import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerData = {
  name: '',
  email: '',
  password: ''
};
  constructor(private authService:Auth,private router:Router ) {}
errorMessage = '';

  register() {

    console.log(this.registerData);

    this.authService.register(this.registerData)
      .subscribe({
        next: (response:any) => {
          console.log(response);
            this.router.navigate(['/login']);
        },

        error: (error) => {
          console.log(error);
           this.errorMessage = error.error.message;
        }
      });}
    
}
