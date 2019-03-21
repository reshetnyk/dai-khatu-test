import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RentFormService} from '../rent-form/rent-form.service';

@Component({
  selector: 'app-guests-and-beds',
  templateUrl: './guests-and-beds.component.html',
  styleUrls: ['./guests-and-beds.component.css']
})
export class GuestsAndBedsComponent implements OnInit {
  guestsForm: FormGroup;
  RENT_TYPE_BED = 'Ліжкомісце';
  rentTypeIsABed = false;
  constructor(private rentFormService: RentFormService) {
  }
  ngOnInit() {
    this.initRentType();
    this.guestsForm = new FormGroup({
      guests: new FormControl({value: '1', disabled: true}),
      beds: new FormControl({value: '1', disabled: true}),
      bedrooms: new FormControl({value: '1', disabled: true}),
    });
    this.loadData();
  }
  onSubmit(): boolean {
    console.log(this.guestsForm.getRawValue());
    if (this.guestsForm.invalid) {
      return false;
    }
    this.rentFormService.setGuestsData(this.guestsForm.getRawValue());
    return true;
  }
  initRentType() {
    const roomData = this.rentFormService.getRoomData();
    if (roomData) {
      this.rentTypeIsABed = roomData.rentType === this.RENT_TYPE_BED;
    }
  }
  private loadData() {
    const data = this.rentFormService.getGuestsData();
    if (data) {
      this.guestsForm.setValue(data);
    }
  }
}
