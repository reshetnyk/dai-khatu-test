import { Component, OnInit } from '@angular/core';
import {StepForm} from '../step-form';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  stepform: StepForm;
  constructor() {
    this.stepform = new StepForm(8);
  }

  ngOnInit() {
  }
  done(): void {
  }
}
