import {
  Component,
  ElementRef,
  Provider,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const BARS_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BarsComponent),
  multi: true,
};
@Component({
  selector: 'app-bars',
  standalone: true,
  imports: [],
  providers: [BARS_VALUE_PROVIDER],
  template: `
    <input type="number" (input)="changeBarCount($event)" />
    @if(barCount()){
    <span>{{ bars() }}</span>
    }
  `,
  styles: ``,
})
export class BarsComponent implements ControlValueAccessor {
  barCount = signal<number | null>(null);
  bars = computed(() => {
    return Array.from({ length: this.barCount()! }, () => ' | ').join('');
  });

  private onChange: Function = () => {};
  private onTouched: Function = () => {};
  constructor(private element: ElementRef) {}

  writeValue(value: string): void {
    console.log('---->', value);
    this.element.nativeElement.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = (value: string) => {
      fn(value);
    };
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.element.nativeElement.disabled = isDisabled;
  }

  changeBarCount(e: Event) {
    let barCount = +(e.target as HTMLInputElement).value;
    this.barCount.set(barCount);
    this.onChange(this.bars());
  }
}
