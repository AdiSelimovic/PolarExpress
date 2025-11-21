import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CitySelectionService, DEPARTURE_CITIES } from '../../services/city-selection.service';

@Component({
  selector: 'app-journey',
  imports: [],
  templateUrl: './journey.html',
  styleUrl: './journey.css',
})
export class Journey {
  private router = inject(Router);
  private cityService = inject(CitySelectionService);

  cities = DEPARTURE_CITIES;

  selectCity(cityId: string) {
    this.cityService.selectCity(cityId);
    this.router.navigate(['/experience']);
  }
}
