import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RentFormService} from '../rent-form/rent-form.service';

@Component({
  selector: 'app-bathroom',
  templateUrl: './bathroom.component.html',
  styleUrls: ['./bathroom.component.css']
})
export class BathroomComponent implements OnInit {
  bathForm: FormGroup;
  constructor(private rentFormService: RentFormService) { }
  ngOnInit() {
    this.bathForm = new FormGroup({
      toilet: new FormControl(false),
      yardToilet: new FormControl(false),
      shower: new FormControl(false),
      jacuzzi: new FormControl(false),
      pool: new FormControl(false),
    });
    this.loadData();
  }
  public onSubmit(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.bathForm.invalid) {
        resolve(false);
      }
      this.rentFormService.setBathroomData(this.bathForm.getRawValue());
      resolve(true);
    });
  }
  private loadData() {
    this.rentFormService.getBathroomData().subscribe(bathroomData => {
      if (bathroomData) {
        this.bathForm.setValue(bathroomData);
      }
    });
  }
}
