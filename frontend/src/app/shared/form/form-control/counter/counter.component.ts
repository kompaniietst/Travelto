import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CounterComponent),
    multi: true
  }]
})
export class CounterComponent implements OnInit, ControlValueAccessor {
  @Input() limitRange: Array<number> = [0, 10];

  value = 0;

  constructor() { }

  onChange = (value: number) => { }
  onTounched = () => { }

  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTounched = fn;
  }

  count(n: number) {
    if (n < this.limitRange[0] && this.value > this.limitRange[0] || n > this.limitRange[0] && this.value < this.limitRange[1])
      this.value += n;

    this.onChange(this.value);
  }

  ngOnInit() { }
}
