import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RentCreationComponent} from './rent-creation.component';
import {RentCreationRoutingModule} from './rent-creation-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RentCreationRoutingModule
  ],
  declarations: [RentCreationComponent],
  exports: [],
})
export class RentCreationModule { }
