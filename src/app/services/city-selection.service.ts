import { Injectable, signal } from '@angular/core';

export interface DepartureCity {
  id: string;
  name: string;
  station: string;
  address: string;
  distanceToChurchill: number; // in miles
  basePriceMultiplier: number;
}

export const DEPARTURE_CITIES: DepartureCity[] = [
  {
    id: 'new-york',
    name: 'New York City',
    station: 'Grand Central Terminal',
    address: '89 E 42nd Street, New York, NY 10017',
    distanceToChurchill: 2100,
    basePriceMultiplier: 1.5
  },
  {
    id: 'chicago',
    name: 'Chicago',
    station: 'Union Station',
    address: '225 S Canal Street, Chicago, IL 60606',
    distanceToChurchill: 1500,
    basePriceMultiplier: 1.3
  },
  {
    id: 'toronto',
    name: 'Toronto',
    station: 'Union Station',
    address: '65 Front Street West, Toronto, ON M5J 1E6',
    distanceToChurchill: 1300,
    basePriceMultiplier: 1.2
  },
  {
    id: 'boston',
    name: 'Boston',
    station: 'South Station',
    address: '700 Atlantic Avenue, Boston, MA 02110',
    distanceToChurchill: 2200,
    basePriceMultiplier: 1.6
  },
  {
    id: 'montreal',
    name: 'Montreal',
    station: 'Gare Centrale',
    address: '895 Rue de la Gauchetière O, Montreal, QC H3B 4G1',
    distanceToChurchill: 1600,
    basePriceMultiplier: 1.4
  },
  {
    id: 'seattle',
    name: 'Seattle',
    station: 'King Street Station',
    address: '303 S Jackson Street, Seattle, WA 98104',
    distanceToChurchill: 1800,
    basePriceMultiplier: 1.45
  }
];

@Injectable({
  providedIn: 'root'
})
export class CitySelectionService {
  private selectedCity = signal<DepartureCity | null>(null);

  city = this.selectedCity.asReadonly();

  selectCity(cityId: string) {
    const city = DEPARTURE_CITIES.find(c => c.id === cityId);
    if (city) {
      this.selectedCity.set(city);
    }
  }

  clearSelection() {
    this.selectedCity.set(null);
  }

  getCityById(cityId: string): DepartureCity | undefined {
    return DEPARTURE_CITIES.find(c => c.id === cityId);
  }
}
