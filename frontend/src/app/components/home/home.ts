import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  imports: [Navbar,Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
 
  trendingProducts = [
    { name: 'Wireless Headphones', price: 799, oldPrice: 999, discount: 20, image: 'https://placehold.co/300x300?text=Headphones', rating: 4 },
    { name: 'Smart Watch', price: 1299, oldPrice: null, discount: 0, image: 'https://placehold.co/300x300?text=Smart+Watch', rating: 5, isNew: true },
    { name: 'Running Shoes', price: 450, oldPrice: 600, discount: 25, image: 'https://placehold.co/300x300?text=Shoes', rating: 4 },
    { name: 'Backpack', price: 350, oldPrice: null, discount: 0, image: 'https://placehold.co/300x300?text=Backpack', rating: 3 },
    { name: 'Bluetooth Speaker', price: 599, oldPrice: null, discount: 0, image: 'https://placehold.co/300x300?text=Speaker', rating: 4, isNew: true },
    { name: 'Sunglasses', price: 250, oldPrice: null, discount: 0, image: 'https://placehold.co/300x300?text=Sunglasses', rating: 5 }
  ];



 
}
