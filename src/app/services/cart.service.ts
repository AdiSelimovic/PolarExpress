import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'coach' | 'first';
  departureCity: string;
  departureCityName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  items = this.cartItems.asReadonly();

  totalItems = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  addToCart(item: Omit<CartItem, 'quantity'>) {
    const currentItems = this.cartItems();
    // Match by both type and departure city
    const itemKey = `${item.type}-${item.departureCity}`;
    const existingItem = currentItems.find(i =>
      `${i.type}-${i.departureCity}` === itemKey
    );

    if (existingItem) {
      this.cartItems.set(
        currentItems.map(i =>
          `${i.type}-${i.departureCity}` === itemKey ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      this.cartItems.set([...currentItems, { ...item, id: itemKey, quantity: 1 }]);
    }
  }

  removeFromCart(itemId: string) {
    this.cartItems.set(this.cartItems().filter(item => item.id !== itemId));
  }

  updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }

    this.cartItems.set(
      this.cartItems().map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
