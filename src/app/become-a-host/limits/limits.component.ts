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
    this.rentFormService.getLimitsData().subscribe(limitsData => {
      if (limitsData) {
        this.limitsForm.setValue(limitsData);
      }
    });
  }

  public onSubmit(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.limitsForm.invalid) {
        resolve(false);
      }
      this.rentFormService.setLimitsData(this.limitsForm.getRawValue());
      resolve(true);
    });
  }

}
