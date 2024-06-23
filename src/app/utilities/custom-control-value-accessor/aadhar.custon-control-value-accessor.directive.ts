import {
  Directive,
  ElementRef,
  HostListener,
  Provider,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const AADHAR_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AadharCustonControlValueAccessorDirective),
  multi: true,
};
@Directive({
  selector: 'input[data-input-type="aadharNo"][formControlName]',
  standalone: true,
  providers: [AADHAR_VALUE_PROVIDER],
})
export class AadharCustonControlValueAccessorDirective
  implements ControlValueAccessor
{
  constructor(private element: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  private onChange!: Function;

  @HostListener('blur')
  private onTouched!: Function;

  //to update html value with model value changes
  writeValue(newValue: string): void {
    if (newValue !== undefined) {
      this.element.nativeElement.value = this.formateAdadharNo(newValue);
    }
  }

  // to update model value with html value changes
  registerOnChange(fn: any): void {
    this.onChange = (value: string) => {
      let formattedValue = this.formateAdadharNo(value);
      fn(formattedValue);
      this.writeValue(value);
    };
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.element.nativeElement.disabled = isDisabled;
  }

  formateAdadharNo(adharNo: string) {
    return adharNo
      .replace(/ /g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }
}
