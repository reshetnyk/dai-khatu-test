import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomForm = new FormGroup({
    placeType: new FormControl(''),
    rentType: new FormControl('')
  });
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log();
  }
}
