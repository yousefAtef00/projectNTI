import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './components/home/home';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { Login } from './components/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Footer,Navbar],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projectNTI-frontend');
}
