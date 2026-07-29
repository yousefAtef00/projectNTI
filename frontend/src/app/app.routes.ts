import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { ContactUs } from './components/contact-us/contact-us';
import { About } from './components/about/about';
import { Checkout } from './components/checkout/checkout';
import { Cart } from './components/cart/cart';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
    title:'Home'
  },

  {
    path: 'products',
    component: Products,
    title:'Products'
  },

  {
    path: 'login',
    component: Login,
    title:'Login'
  },

  {
    path: 'register',
    component: Register,
    title:'Register'
  },

  {
    path: 'cart',
    component: Cart,
    title:'Cart'
  },

  {
    path: 'checkout',
    component: Checkout,
    title:'Checkout'
  },

  {
    path: 'about',
    component: About,
    title:'About'
  },

  {
    path: 'contact',
    component: ContactUs,
    title:'ContactUs'
  },
  {
    path:'**',
    component:NotFound
  }
];
