import { Component, OnInit } from '@angular/core';
import {Calendar} from './calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  visible: boolean;
  calendar: Calendar;
  selectionBegin: Date;
  selectionEnd: Date;
  ckickedLast: Date;
  ckickedEarlier: Date;
  constructor() {
    this.visible = false;
    this.calendar = new Calendar();
  }

  ngOnInit() {
  }
  onCkick(date: Date) {
    if (!this.selectionBegin) {
      this.ckickedLast = new Date(date);
      this.selectionBegin = new Date(date);
      return;
    }
    this.ckickedEarlier = this.ckickedLast;
    this.ckickedLast = new Date(date);
    if (this.ckickedEarlier > this.ckickedLast) {
      this.selectionBegin = this.ckickedLast;
      this.selectionEnd = this.ckickedEarlier;
    } else {
      this.selectionBegin = this.ckickedEarlier;
      this.selectionEnd = this.ckickedLast;
    }
  }
  isSelectedDate(day: Date): boolean {
    if (this.selectionBegin) {
      if (this.selectionEnd) {
        if (day >= this.selectionBegin && day <= this.selectionEnd) {
          return true;
        }
      } else {
        if (day.getTime() === this.selectionBegin.getTime()) {
          return true;
        }
      }
    }
    return false;
  }
  isClickedLast(date: Date): boolean {
    if (this.ckickedLast) {
      return date.getTime() === this.ckickedLast.getTime();
    } else {
      return false;
    }
  }
  toggleCalendar(): void {
    this.visible = !this.visible;
  }
}
