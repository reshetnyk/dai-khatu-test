import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RentFormService} from '../rent-form/rent-form.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  placeTypes = ['Приватний будинок', 'Багатоповерхівка/гуртожиток'];
  rentTypes = ['Все помешкання', 'Кімната', 'Ліжкомісце'];
  roomForm = new FormGroup({
    placeType: new FormControl(),
    rentType: new FormControl()
  });
  placeTypeSubscription;
  placeTypeRequiredError = null;
  rentTypeRequiredError = null;
  constructor(private rentFormService: RentFormService) {
    // console.log(this.roomForm.controls['rentType'].setValue(null));
  }
  ngOnInit() {
    this.createValidators();
    this.loadData();
  }
  public createValidators(): void {
    this.roomForm.controls['placeType'].setValidators(Validators.required);
    this.roomForm.controls['rentType'].setValidators(Validators.required);
  }
  private subscribeToPlaceType(): void {
    this.placeTypeSubscription = this.roomForm.get('placeType')
      .valueChanges
      .subscribe((value) => {

      } );
  }
  public onSubmit(): boolean {
    if (this.roomForm.invalid) {
      if (this.placeType.errors) {
        this.placeTypeRequiredError = this.placeType.errors.required;
      }
      if (this.rentType.errors) {
        this.rentTypeRequiredError = this.rentType.errors.required;
      }
      return false;
    }
    this.rentFormService.setRoomData(this.roomForm.getRawValue());
    return true;
  }
  ngOnDestroy() {
    // this.placeTypeSubscription.unsubscribe();
  }
  get placeType() { return this.roomForm.get('placeType'); }
  get rentType() { return this.roomForm.get('rentType'); }
  private loadData() {
    const data = this.rentFormService.getRoomData();
    if (data) {
      this.roomForm.setValue(data);
    }
  }
  hidePlaceTypeRequiredError() {
    this.placeTypeRequiredError = false;
  }
  hideRentTypeRequiredError() {
    this.rentTypeRequiredError = false;
  }
}
