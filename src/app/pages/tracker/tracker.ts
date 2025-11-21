import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitySelectionService, DEPARTURE_CITIES } from '../../services/city-selection.service';

interface JourneyMilestone {
  name: string;
  distance: number;
  description: string;
}

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tracker.html',
  styleUrls: ['./tracker.css']
})
export class Tracker {
  private cityService = inject(CitySelectionService);

  // Journey tracking
  currentProgress = signal(0); // 0-100%
  selectedCity = this.cityService.city;
  cities = DEPARTURE_CITIES;

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

  selectDepartureCity(cityId: string) {
    this.cityService.selectCity(cityId);
    this.currentProgress.set(0); // Reset progress when changing city
  }
}
