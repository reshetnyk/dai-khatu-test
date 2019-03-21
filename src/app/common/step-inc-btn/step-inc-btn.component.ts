import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-step-inc-btn',
  templateUrl: './step-inc-btn.component.html',
  styleUrls: ['./step-inc-btn.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepIncBtnComponent),
      multi: true,
    }
  ]
})
export class StepIncBtnComponent implements OnInit, ControlValueAccessor, OnChanges {
  disabledState = false;
  input: FormControl;
  propagateChange: any = () => {};
  constructor() { }
  ngOnInit() {
    this.input = new FormControl('1');
  }
  inc() {
    let value = parseInt(this.input.value, 10);
    if (!Number.isNaN(value)) {
      value++;
    } else {
      value = 1;
    }
    this.writeValue(value);
  }
  dec() {
    let value = parseInt(this.input.value, 10);
    if (!Number.isNaN(value) && value > 1) {
      value--;
    } else {
      value = 1;
    }
    this.writeValue(value);
  }
  setInputValue(value) {
    this.input.patchValue(value);
    this.propagateChange(value);
    console.log('step-inc.ts.setInputValue');
    console.log(value);
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState = isDisabled;
    const action = isDisabled ? 'disable' : 'enable';
    this.input[action]();
  }

  writeValue(obj: any): void {
    this.setInputValue(obj);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
