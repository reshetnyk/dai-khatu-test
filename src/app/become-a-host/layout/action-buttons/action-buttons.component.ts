import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent implements OnInit {
  @Output() goingToNextTabEvent = new EventEmitter<any>();
  @Output() goingToPrevTabEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  showNextTab() {
    this.goingToNextTabEvent.emit(null);
  }
  showPrevTab() {
    this.goingToPrevTabEvent.emit(null);
  }
}
