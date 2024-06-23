import { Component, Input, Provider, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

const CUSTOM_INPUT_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextInputComponent),
  multi: true,
};
@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [],
  providers: [CUSTOM_INPUT_ACCESSOR],
  template: `
    <div>
      <label [for]="fieldName">{{ label }}:</label>
      <input
        type="text"
        [id]="fieldName"
        [value]="value"
        [disabled]="isDisabled"
        (input)="onInput($event)"
        (blur)="touched()"
        [class.error-field]="(getControl()?.errors?.['required'] || getControl()?.errors?.['pattern']) && getControl()?.touched"
      />
    </div>
  `,
  styles: `
     .error-field{
       border: 1px solid red;
       outline: none;
       box-shadow: 0 0 5px rgba(255, 0, 0, 0.7);  
    }
  `,
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() perentForm!: FormGroup;

  @Input() fieldName!: string;

  @Input() label!: string;

  value: string = '';
  changed: (value: string) => void = () => {};
  touched: () => void = () => {};
  isDisabled: boolean = false;

  writeValue(newValue: string): void {
    this.value = newValue;
  }
  registerOnChange(fn: any): void {
    this.changed = fn;
  }
  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.changed(value);
  }

  getControl() {
    return this.perentForm.get(this.fieldName);
  }
}
