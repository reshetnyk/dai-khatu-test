import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StepIncBtnComponent} from './step-inc-btn.component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    StepIncBtnComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    StepIncBtnComponent
  ],
})
export class StepIncBtnModule { }
