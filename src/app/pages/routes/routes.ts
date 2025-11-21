import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DEPARTURE_CITIES, CitySelectionService } from '../../services/city-selection.service';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routes.html',
  styleUrls: ['./routes.css']
})
export class Routes {
  private router = inject(Router);
  private cityService = inject(CitySelectionService);
  cities = DEPARTURE_CITIES;

  selectCity(cityId: string) {
    this.cityService.selectCity(cityId);
    this.router.navigate(['/experience']);
  }
}
