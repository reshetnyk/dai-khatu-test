import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRegionResponse, RegionItem} from './region-item';
import {tap} from 'rxjs/operators';
import {IVillageResponse, VillageItem} from './village-items';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentFormService {
  constructor(private http: HttpClient) { }
  roomData = new BehaviorSubject(null);
  guestsData = new BehaviorSubject(null);
  bathroomData = new BehaviorSubject(null);
  householdApplData = new BehaviorSubject(null);
  facilitiesData = new BehaviorSubject(null);
  limitsData = new BehaviorSubject(null);
  locationFormData = new BehaviorSubject(null);
  locationGoogleData = new BehaviorSubject(null);
  mapData = new BehaviorSubject(null);
  getRoomData() {
    return this.roomData;
  }
  setRoomData(roomData: any) {
    this.roomData.next(roomData);
  }
  getGuestsData(): any {
    return this.guestsData;
  }
  setGuestsData(guestsData: any) {
    this.guestsData.next(guestsData);
  }
  getBathroomData(): any {
    return this.bathroomData;
  }
  setBathroomData(bathroomData: any) {
    this.bathroomData.next(bathroomData);
  }
  getHouseholdApplData(): any {
    return this.householdApplData;
  }
  setHouseholdApplData(householdApplData: any) {
    this.householdApplData.next(householdApplData);
  }
  getFacilitiesData(): any {
    return this.facilitiesData;
  }
  setFacilitiesData(facilitiesData: any) {
    this.facilitiesData.next(facilitiesData);
  }
  getLimitsData(): any {
    return this.limitsData;
  }
  setLimitsData(limitsData: any) {
    this.limitsData.next(limitsData);
  }
  getLocationFormData(): any {
    return this.locationFormData;
  }
  getLocationGoogleData(): any {
    return this.locationGoogleData;
  }
  setLocationFormData(formData: any) {
    this.locationFormData.next(formData);
  }
  setLocationGoogleData(googleData: any) {
    this.locationGoogleData.next(googleData);
  }
  getMapData(): any {
    return this.mapData;
  }
  setMapData(mapData: any) {
    this.mapData.next(mapData);
  }

  loadRegions() {
    return this.http.get<IRegionResponse>('./assets/jsonData/regions.json')
      .pipe(
        tap((responce: IRegionResponse) => {
          responce.regions = responce.regions
          .map(region => new RegionItem(region.id, region.region));
        }),
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
      );
  }
  getCoordinates(address: string) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
      encodeURI(address) + '&key=AIzaSyBaJykETyuF6xLyriZ56d7JBXRAwx0vqTc&language=uk')
      .pipe(
        tap(data => data, error => {
          console.log(error.message);
          return null;
        })
      );
  }
  getFormData() {
    return {
      roomData: this.roomData.value,
      guestsData: this.guestsData.value,
      bathroomData: this.bathroomData.value,
      householdApplData: this.householdApplData.value,
      facilitiesData: this.facilitiesData.value,
      limitsData: this.limitsData.value,
      locationFormData: this.locationFormData.value,
      locationGoogleData: this.locationGoogleData.value,
      mapData: this.mapData.value
    };
  }
  setFormData(formData) {
    this.setRoomData(formData.roomData);
    this.setGuestsData(formData.guestsData);
    this.setBathroomData(formData.bathroomData);
    this.setHouseholdApplData(formData.householdApplData);
    this.setFacilitiesData(formData.facilitiesData);
    this.setLimitsData(formData.limitsData);
    this.setLocationFormData(formData.locationFormData);
    this.setLocationGoogleData(formData.locationGoogleData);
    this.setMapData(formData.mapData);
  }
  loadRent(id) {
    return this.http.get('http://localhost:3000/rentFormMock')
      .pipe(
        tap(data => data, error => {
          console.log(error.message);
          return null;
        })
      );
  }
}
