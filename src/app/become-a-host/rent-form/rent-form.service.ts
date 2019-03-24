import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IRegionResponse, RegionItem} from './region-item';
import {catchError, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {IVillageResponse, VillageItem} from './village-items';

@Injectable({
  providedIn: 'root'
})
export class RentFormService {
  constructor(private http: HttpClient) { }
  roomData =  null;
  guestsData = null;
  bathroomData = null;
  householdApplData = null;
  facilitiesData = null;
  limitsData = null;
  locationData = null;
  mapData = null;
  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  getRoomData(): any {
    return this.roomData;
  }
  setRoomData(roomData: any) {
    this.roomData = roomData;
  }
  getGuestsData(): any {
    return this.guestsData;
  }
  setGuestsData(guestsData: any) {
    this.guestsData = guestsData;
  }
  getBathroomData(): any {
    return this.bathroomData;
  }
  setBathroomData(bathroomData: any) {
    this.bathroomData = bathroomData;
  }
  getHouseholdApplData(): any {
    return this.householdApplData;
  }
  setHouseholdApplData(householdApplData: any) {
    this.householdApplData = householdApplData;
  }
  getFacilitiesData(): any {
    return this.facilitiesData;
  }
  setFacilitiesData(facilitiesData: any) {
    this.facilitiesData = facilitiesData;
  }
  getLimitsData(): any {
    return this.limitsData;
  }
  setLimitsData(limitsData: any) {
    this.limitsData = limitsData;
  }
  getLocationData(): any {
    return this.locationData;
  }
  setLocationData(locationData: any) {
    this.locationData = locationData;
  }
  getMapData(): any {
    return this.mapData;
  }
  setMapData(mapData: any) {
    this.mapData = mapData;
  }

  loadRegions() {
    return this.http.get<IRegionResponse>('./assets/jsonData/regions.json')
      .pipe(
        tap((responce: IRegionResponse) => {
          responce.regions = responce.regions
          .map(region => new RegionItem(region.id, region.region));
        }),
        catchError(RentFormService.handleError)
      );
  }
  loadVillages(term: string, regionId: number): Observable<IVillageResponse> {
    return this.http.get<IVillageResponse>('./assets/jsonData/villages.json')
      .pipe(
        tap((response: IVillageResponse) => {
          response.villages = response.villages
            .map(village => new VillageItem(village.id, village.regionId, village.village))
            .filter(village => {
              return village.regionId == regionId && village.village.toLowerCase().indexOf(term.toLowerCase()) === 0;
              });
          return response;
        }),
        catchError(RentFormService.handleError)
      );
  }
  getCoordinates(address: string) {
    console.log(address);
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
      encodeURI(address) + '&key=AIzaSyBaJykETyuF6xLyriZ56d7JBXRAwx0vqTc&language=uk')
      .subscribe(
        resp => {
        console.log(resp);
      },
          error => {
        console.log(error);
        });
  }
}
