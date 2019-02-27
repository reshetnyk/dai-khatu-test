
export class StepForm {
  private currentFieldset: number;
  private fieldsetAmount: number;
  constructor(fieldsetAmount: number) {
    this.currentFieldset = 1;
    this.fieldsetAmount = fieldsetAmount;
  }
  isFieldset(n: number): boolean {
    return this.currentFieldset === n;
  }
  nextFieldset(): void {
    if (this.currentFieldset + 1 <= this.fieldsetAmount) {
      this.currentFieldset++;
    }
  }
  prevFieldset(): void {
    if (this.currentFieldset - 1 >= 1) {
      this.currentFieldset--;
    }
  }
  lastFieldset(): boolean {
    return this.currentFieldset === this.fieldsetAmount;
  }
  firstFieldset(): boolean {
    return this.currentFieldset === 1;
  }
  setFieldset(fieldset: number): void {
    if (fieldset >= 1 && fieldset <= this.fieldsetAmount) {
      this.currentFieldset = fieldset;
    }
  }
}
