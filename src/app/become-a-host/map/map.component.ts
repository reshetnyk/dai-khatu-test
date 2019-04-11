import {Component, OnInit, ViewChild} from '@angular/core';
import { } from 'googlemaps';
import {RentFormService} from '../rent-form/rent-form.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  marker: google.maps.Marker;
  changingMarkerPosition = false;
  constructor(private rentFormService: RentFormService) { }
  mapCenter: google.maps.LatLng;
  formatedAdress: string;
  coordinatesWereCorrected = false;
  ngOnInit() {
    this.loadData();

  }
  async loadData() {
    const mapData = await new Promise(resolve => {
      this.rentFormService.getMapData().subscribe(data => {
        resolve(data);
      });
    });
    const locationGoogleData = await new Promise(resolve => {
      this.rentFormService.getLocationGoogleData().subscribe(data => {
        resolve(data);
      });
    });
    if (locationGoogleData) {
      if (mapData) {
        this.mapCenter = new google.maps.LatLng(
          (mapData as any).correctedLatLng.lat,
          (mapData as any).correctedLatLng.lng,
        );
      } else {
        this.mapCenter = new google.maps.LatLng(
          (locationGoogleData as any).results[0].geometry.location.lat,
          (locationGoogleData as any).results[0].geometry.location.lng);
      }
      console.log(this.mapCenter.lat() + '' + this.mapCenter.lng());
      this.formatedAdress = (locationGoogleData as any).results[0].formatted_address;
    }
    this.initMap();
    this.initMarker();
  }
  private initMap() {
    const mapProps = {
      center: this.mapCenter,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      draggable: false,
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProps);
  }
  private initMarker() {
    this.marker = new google.maps.Marker({
      position: this.mapCenter,
      map: this.map,
      icon: 'assets/img/marker.png',
    });
    const moveMarkerControlDiv = document.createElement('div');
    const moveMarkerControl = this.MoveMarkerControl(moveMarkerControlDiv, this.map);
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(moveMarkerControlDiv);
  }
  MoveMarkerControl(controlDiv, map) {
    const controlUI = document.createElement('div');
    controlUI.classList.add('change-marker-pos-btn');
    controlUI.innerHTML = 'Підправити';
    this.map.addListener('center_changed', () => {
      this.marker.setPosition(this.map.getCenter());
    });
    controlUI.addEventListener('click', () => {
      if (this.changingMarkerPosition) {
        map.setOptions({draggable: false, zoom: 16});
        this.changingMarkerPosition = false;
        controlUI.innerHTML = 'Підправити';
        return;
      }
      this.coordinatesWereCorrected = true;
      this.changingMarkerPosition = true;
      map.setOptions({draggable: true, zoom: 18});
      controlUI.innerHTML = 'Зберегти';
    });
    controlDiv.appendChild(controlUI);
    return controlUI;
  }
  public onSubmit(): Promise<boolean> {
    return new Promise(resolve => {
      let mapData = null;
      if (this.coordinatesWereCorrected) {
        mapData = {
          correctedLatLng: {
            lat: this.map.getCenter().lat(),
            lng: this.map.getCenter().lng(),
          },
        };
      }
      this.rentFormService.setMapData(mapData);
      console.log(JSON.stringify(this.rentFormService.getFormData()));
      resolve(true);
    });
  }
}
