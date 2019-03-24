import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RentFormService} from '../rent-form/rent-form.service';
import {iif, Observable, of, Subject} from 'rxjs';
import {IVillageResponse, VillageItem} from '../rent-form/village-items';
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
    this.region.valueChanges.subscribe(value => { console.log(value); });
  }
  private initVillages() {
    this.villages = this.village.valueChanges.pipe(
      debounceTime(500),
      switchMap(term =>
        iif(() => term.length > 2,
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
  onSubmit(): boolean {
    //this.rentFormService.getCoordinates('Україна, Черкаська обл., черкаси, Паризької Комуни, 7');
    if (this.locationForm.invalid) {
      if (this.region.errors) {
        if (this.region.errors.required) {
          this.regionRequiredError = true;
        }
      }
      return false;
    }
    console.log(this.locationForm.getRawValue());
    this.rentFormService.setLocationData(this.locationForm.getRawValue());
    const address = 'Україна, ' + this.region.value.id + ', ' +
      this.village.value + ', ' +
      this.street.value;
    //this.rentFormService.getCoordinates(address);
    return true;
  }
  private loadData() {
    const data = this.rentFormService.getLocationData();
    if (data) {
      this.locationForm.setValue(data);
      this.region.patchValue(data.region);
      console.log('loadData');
      console.log(data.region);
      console.log('region');
      console.log(this.region.value);
    }
  }
  regionSelectComparator(region1: any, region2: any) {
    if (region1 && region2) {
      return region1.id === region2.id;
    }
    return false;
  }
}
