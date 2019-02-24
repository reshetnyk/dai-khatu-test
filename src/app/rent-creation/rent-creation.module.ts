import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RentCreationComponent} from './rent-creation.component';
import {RentCreationRoutingModule} from './rent-creation-routing.module';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';

@NgModule({
  imports: [
    CommonModule,
    RentCreationRoutingModule
  ],
  declarations: [RentCreationComponent, Step1Component, Step2Component],
  exports: [],
})
export class RentCreationModule { }
