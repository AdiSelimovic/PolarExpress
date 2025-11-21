import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  private cartService = inject(CartService);
  private router = inject(Router);

  addToCart(type: 'coach' | 'first') {
    const item = {
      id: type,
      name: type === 'coach' ? 'Coach Class Experience' : 'First Class Experience',
      price: type === 'coach' ? 89 : 149,
      type: type
    };

    this.cartService.addToCart(item);
    this.router.navigate(['/cart']);
  }
}
