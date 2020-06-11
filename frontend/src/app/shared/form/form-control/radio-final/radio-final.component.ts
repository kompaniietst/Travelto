import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-radio-final',
  templateUrl: './radio-final.component.html',
  styleUrls: ['./radio-final.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioFinalComponent),
    multi: true
  }]
})
export class RadioFinalComponent implements OnInit, ControlValueAccessor {

  @Input() control;

  constructor() { }

  writeValue(obj: any): void { }
  onChange = (value: any) => { };
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void { }


  ngOnInit(): void { }

  onSelect(i) {
    this.onChange(i);
  }
}
