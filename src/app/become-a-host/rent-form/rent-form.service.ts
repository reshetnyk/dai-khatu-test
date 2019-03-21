import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentFormService {
  roomData =  null;
  guestsData = null;
  bathroomData = null;
  householdApplData = null;
  facilitiesData = null;
  constructor() { }
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
}
