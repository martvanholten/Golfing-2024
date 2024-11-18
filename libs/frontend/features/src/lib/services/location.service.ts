import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  readonly locations: Location[] = [
    {
      id: 1,
      city: 'Oosterhoud',
      name: 'Bergvlied',
      address: "Huisstraat 1",
      large: true,
    }
  ];

  constructor() {}

  getLocations(): Location[] {
    return this.locations;
  }

  getLocationsAsObservable(): Observable<Location[]> {
    return of(this.locations);
  }

  getLocationById(id: number): Location {
    return this.locations.filter((location) => location.id === id)[0];
  }
}