import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RentFormService} from '../rent-form/rent-form.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  placeTypes = ['Приватний будинок', 'Багатоповерхівка/гуртожиток'];
  rentTypes = ['Все помешкання', 'Кімната', 'Ліжкомісце'];
  roomForm = new FormGroup({
    placeType: new FormControl(),
    rentType: new FormControl()
  });
  placeTypeRequiredError = null;
  rentTypeRequiredError = null;
  constructor(private rentFormService: RentFormService) {
    this.createValidators();
    this.loadData();
  }
  ngOnInit() {

  }
  public createValidators(): void {
    this.placeType.setValidators(Validators.required);
    this.rentType.setValidators(Validators.required);
  }
  public onSubmit(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.roomForm.invalid) {
        if (this.placeType.errors) {
          this.placeTypeRequiredError = this.placeType.errors.required;
        }
        if (this.rentType.errors) {
          this.rentTypeRequiredError = this.rentType.errors.required;
        }
        resolve(false);
      }
      this.rentFormService.setRoomData(this.roomForm.getRawValue());
      resolve(true);
    });
  }
  get placeType() { return this.roomForm.get('placeType'); }
  get rentType() { return this.roomForm.get('rentType'); }
  private loadData() {
    this.rentFormService.getRoomData().subscribe(roomData => {
      if (roomData) {
        this.roomForm.setValue(roomData);
      }
    });
  }
  hidePlaceTypeRequiredError() {
    this.placeTypeRequiredError = false;
  }
  hideRentTypeRequiredError() {
    this.rentTypeRequiredError = false;
  }
}
