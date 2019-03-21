import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RentFormService} from '../rent-form/rent-form.service';

@Component({
  selector: 'app-household-appliances',
  templateUrl: './household-appliances.component.html',
  styleUrls: ['./household-appliances.component.css']
})
export class HouseholdAppliancesComponent implements OnInit {
  householdApplForm: FormGroup;
  constructor(private rentFormService: RentFormService) {
    this.householdApplForm = new FormGroup({
      plate: new FormControl(false),
      dishwasher: new FormControl(false),
      oven: new FormControl(false),
      washingMachine: new FormControl(false),
      microwave: new FormControl(false),
      refrigerator: new FormControl(false),
      clothesDryer: new FormControl(false),
      iron: new FormControl(false),
      vacuumCleaner: new FormControl(false),
      airConditioning: new FormControl(false),
      hairDryer: new FormControl(false),
    });
    this.loadData();
  }

  ngOnInit() {
  }
  private loadData() {
    const data = this.rentFormService.getHouseholdApplData();
    if (data) {
      this.householdApplForm.setValue(data);
    }
  }
  onSubmit(): boolean {
    console.log(this.householdApplForm.getRawValue());
    if (this.householdApplForm.invalid) {
      return false;
    }
    this.rentFormService.setHouseholdApplData(this.householdApplForm.getRawValue());
    return true;
  }
}
