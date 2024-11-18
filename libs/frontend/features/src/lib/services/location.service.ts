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
  getLocations(): Observable<Location[]> {
    return of(this.locations);
  }

  getLocationById(id: number): Observable<Location> {
    return of(this.locations.filter((location) => location.id === id)[0]);
  }
}