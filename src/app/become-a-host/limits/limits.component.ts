import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RentFormService} from '../rent-form/rent-form.service';

@Component({
  selector: 'app-limits',
  templateUrl: './limits.component.html',
  styleUrls: ['./limits.component.css']
})
export class LimitsComponent implements OnInit {
  limitsForm: FormGroup;
  constructor(private rentFormService: RentFormService) {
    this.limitsForm = new FormGroup({
      forBoyOnly: new FormControl(false),
      forGirlOnly: new FormControl(false),
      forFamilyOnly: new FormControl(false),
      withoutChildren: new FormControl(false),
      notForStudents: new FormControl(false),
      withoutPets: new FormControl(false),
      notForSmokingPeople: new FormControl(false),
      notForForeigners: new FormControl(false),
    });
    this.loadData();
  }

  ngOnInit() {
  }
  private loadData() {
    const data = this.rentFormService.getLimitsData();
    if (data) {
      this.limitsForm.setValue(data);
    }
  }
  onSubmit(): boolean {
    console.log(this.limitsForm.getRawValue());
    if (this.limitsForm.invalid) {
      return false;
    }
    this.rentFormService.setLimitsData(this.limitsForm.getRawValue());
    return true;
  }

}
