import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CitySelectionService, DEPARTURE_CITIES } from '../../services/city-selection.service';
import { CartService } from '../../services/cart.service';

interface JourneyMilestone {
  name: string;
  distance: number;
  description: string;
}

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tracker.html',
  styleUrls: ['./tracker.css']
})
export class Tracker {
  private cityService = inject(CitySelectionService);
  cartService = inject(CartService);

  // Journey tracking
  currentProgress = signal(0); // 0-100%
  cities = DEPARTURE_CITIES;

  // Get purchased city from cart
  purchasedCity = computed(() => {
    const items = this.cartService.items();
    if (items.length === 0) return null;

    // Get the departure city from the first item (all items should have same city)
    const cityId = items[0].departureCity;
    return DEPARTURE_CITIES.find(c => c.id === cityId) || null;
  });

  // Use purchased city if available, otherwise fall back to selected city
  selectedCity = computed(() => {
    const purchased = this.purchasedCity();
    return purchased || this.cityService.city();
  });

  hasTickets = computed(() => this.cartService.totalItems() > 0);

  // Milestones along the route
  milestones: JourneyMilestone[] = [
    { name: 'Departure', distance: 0, description: 'Your journey begins' },
    { name: 'Prairie Crossing', distance: 25, description: 'Rolling through the heartland' },
    { name: 'Winnipeg Junction', distance: 50, description: 'Convergence point - all trains meet' },
    { name: 'Northern Forests', distance: 65, description: 'Entering the boreal wilderness' },
    { name: 'Hudson Bay Approach', distance: 85, description: 'Almost there - polar bears ahead!' },
    { name: 'Churchill, Manitoba', distance: 100, description: 'Welcome to the Arctic!' }
  ];

  // Computed properties
  currentMilestone = computed(() => {
    const progress = this.currentProgress();
    const milestone = [...this.milestones]
      .reverse()
      .find(m => progress >= m.distance);
    return milestone || this.milestones[0];
  });

  progressPercentage = computed(() => this.currentProgress());

  distanceRemaining = computed(() => {
    const city = this.selectedCity();
    if (!city) return 0;
    const totalDistance = city.distanceToChurchill;
    const remaining = totalDistance * (1 - this.currentProgress() / 100);
    return Math.round(remaining);
  });

  distanceTraveled = computed(() => {
    const city = this.selectedCity();
    if (!city) return 0;
    const totalDistance = city.distanceToChurchill;
    const traveled = totalDistance * (this.currentProgress() / 100);
    return Math.round(traveled);
  });

  estimatedTimeRemaining = computed(() => {
    const remaining = this.distanceRemaining();
    // Assuming average speed of 50 mph
    const hours = remaining / 50;
    return hours.toFixed(1);
  });

  updateProgress(value: number) {
    this.currentProgress.set(value);
  }
}
