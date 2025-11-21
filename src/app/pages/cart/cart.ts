import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartService = inject(CartService);
  router = inject(Router);

  updateQuantity(itemId: string, quantity: number) {
    this.cartService.updateQuantity(itemId, quantity);
  }

  removeItem(itemId: string) {
    this.cartService.removeFromCart(itemId);
  }

  proceedToCheckout() {
    if (this.cartService.totalItems() > 0) {
      this.router.navigate(['/book-now']);
    }
  }

  continueShopping() {
    this.router.navigate(['/experience']);
  }
}
