import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-book-now',
  imports: [FormsModule],
  templateUrl: './book-now.html',
  styleUrl: './book-now.css',
})
export class BookNow {
  cartService = inject(CartService);
  private router = inject(Router);

  formData = {
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  };

  submitted = signal(false);

  onSubmit() {
    if (this.isFormValid()) {
      // In a real app, this would send data to a backend
      console.log('Booking submitted:', {
        ...this.formData,
        items: this.cartService.items(),
        total: this.cartService.totalPrice()
      });

      this.submitted.set(true);

      // Clear cart after successful booking
      setTimeout(() => {
        this.cartService.clearCart();
        this.router.navigate(['/']);
      }, 3000);
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.formData.name &&
      this.formData.email &&
      this.formData.phone &&
      this.formData.date
    );
  }
}
