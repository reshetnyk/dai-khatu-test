import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RentFormService} from '../rent-form/rent-form.service';
import {iif, Observable, of} from 'rxjs';
import {IVillageResponse} from '../rent-form/village-items';
import {debounceTime, switchMap} from 'rxjs/operators';
import {IRegionResponse} from '../rent-form/region-item';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  locationForm: FormGroup;
  villages: Observable<IVillageResponse>;
  regions: Observable<IRegionResponse>;
  regionRequiredError = false;
  constructor(private rentFormService: RentFormService) { }

  ngOnInit() {
    this.locationForm = new FormGroup({
      region: new FormControl(),
      village: new FormControl(),
      street: new FormControl(),
    });
    this.initRegions();
    this.initVillages();
    this.loadData();
  }
  private initRegions() {
    this.regions = this.rentFormService.loadRegions();
    this.region.valueChanges.subscribe(value => {
      if (value && value.id == '9') {
        this.village.setValue('');
        this.village.disable();
      } else {
        if (this.village.disabled) {
          this.village.enable();
        }
      }
    });
  }
  private initVillages() {
    this.villages = this.village.valueChanges.pipe(
      debounceTime(500),
      switchMap(term =>
        iif(() => term && term.length > 2,
          this.rentFormService.loadVillages(term, parseInt(this.region.value.id, 10)),
          of({villages: []}),
        )
      ));
  }
  villageDisplayFn(village) {
    if (typeof village === 'string') { return village; }
    if (typeof village === 'object' && village) { return village.village; }
    return null;
  }

  hideRegionRequiredError() {
    this.regionRequiredError = false;
  }
  get region() { return this.locationForm.get('region'); }
  get village() { return this.locationForm.get('village'); }
  get street() { return this.locationForm.get('street'); }


  public onSubmit(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.locationForm.invalid) {
        if (this.region.errors) {
          if (this.region.errors.required) {
            this.regionRequiredError = true;
          }
        }
        resolve(false);
      }
      if (this.rentFormService.getMapData() && !this.locationForm.dirty) {
        resolve(true);
      }
      this.rentFormService.setLocationFormData(this.locationForm.getRawValue());
      const village = (this.village.enabled && this.village.value) ?
        ((typeof this.village.value === 'object') ? this.village.value.village + ', ' : this.village.value + ', ') :
        '';
      const region = (this.region.value.id == '9') ? 'м. ' + this.region.value.region : this.region.value.region + ' обл.';
      const address = 'Україна, ' + region + ', ' + village + this.street.value;
      console.log(address);
      const googleResponse = this.rentFormService.getCoordinates(address);

      googleResponse.subscribe(result => {
        if (result) {
          if ((result as any).status === 'OK') {
            this.rentFormService.setLocationGoogleData(result);
            resolve(true);
          } else {
            console.error('Google response status is "' + (result as any).status + '" for requested address "' + address + '".');
          }
        }
        resolve(false);
        });
    });
  }
  private loadData() {
    this.rentFormService.getLocationFormData().subscribe(locationFormData => {
      if (locationFormData) {
         this.locationForm.setValue(locationFormData);
      }
    });
  }
  regionSelectComparator(region1: any, region2: any) {
    if (region1 && region2) {
      return region1.id === region2.id;
    }
    return false;
  }
}
