import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DEPARTURE_CITIES } from '../../services/city-selection.service';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routes.html',
  styleUrls: ['./routes.css']
})
export class Routes {
  cities = DEPARTURE_CITIES;
}
