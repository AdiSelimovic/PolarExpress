import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CitySelectionService } from '../../services/city-selection.service';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  private cartService = inject(CartService);
  private router = inject(Router);
  private cityService = inject(CitySelectionService);

  selectedCity = this.cityService.city;

  // Base prices
  private baseCoachPrice = 89;
  private baseFirstPrice = 149;

  // Computed prices based on selected city
  coachPrice = computed(() => {
    const city = this.selectedCity();
    if (!city) return this.baseCoachPrice;
    return Math.round(this.baseCoachPrice * city.basePriceMultiplier);
  });

  firstPrice = computed(() => {
    const city = this.selectedCity();
    if (!city) return this.baseFirstPrice;
    return Math.round(this.baseFirstPrice * city.basePriceMultiplier);
  });

  addToCart(type: 'coach' | 'first') {
    const city = this.selectedCity();

    if (!city) {
      // If no city selected, redirect to journey page
      this.router.navigate(['/journey']);
      return;
    }

    const price = type === 'coach' ? this.coachPrice() : this.firstPrice();

    const item = {
      id: `${type}-${city.id}`,
      name: type === 'coach' ? 'Coach Class Experience' : 'First Class Experience',
      price: price,
      type: type,
      departureCity: city.id,
      departureCityName: city.name
    };

    this.cartService.addToCart(item);
    this.router.navigate(['/cart']);
  }
}
