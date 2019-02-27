import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {CalendarModule} from '../calendar/calendar.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CalendarModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
