import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RentFormService} from '../rent-form/rent-form.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {

  facilitiesForm: FormGroup;
  constructor(private rentFormService: RentFormService) {
    this.facilitiesForm = new FormGroup({
      essentialThings: new FormControl(false),
      internet: new FormControl(false),
      tv: new FormControl(false),
      heating: new FormControl(false),
      workplace: new FormControl(false),
      fireplace: new FormControl(false),
      balcony: new FormControl(false),
      parkingPlace: new FormControl(false),
      smokeDetector: new FormControl(false),
      carbonMonoxideDetector: new FormControl(false),
      firstAidKit: new FormControl(false),
      extinguisher: new FormControl(false),
      lockingDoors: new FormControl(false),
    });
    this.loadData();
  }

  ngOnInit() {
  }
  private loadData() {
    const data = this.rentFormService.getFacilitiesData();
    if (data) {
      this.facilitiesForm.setValue(data);
    }
  }
  onSubmit(): boolean {
    console.log(this.facilitiesForm.getRawValue());
    if (this.facilitiesForm.invalid) {
      return false;
    }
    this.rentFormService.setFacilitiesData(this.facilitiesForm.getRawValue());
    return true;
  }

}
