import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormArray } from '@angular/forms';
import { Control } from 'src/app/core/models/Control';

@Component({
  selector: 'app-slider-range',
  templateUrl: './slider-range.component.html',
  styleUrls: ['./slider-range.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderRangeComponent),
    multi: true
  }]
})
export class SliderRangeComponent implements OnInit, ControlValueAccessor {

  @Input() control: Control;
  range: number[];

  form: FormGroup = new FormGroup({});

  constructor() { }

  get formControl() {
    return this.form.get(this.control.key);
  }

  registerOnChange(fn: any): void {
    this.form.get(this.control.key).valueChanges.subscribe(fn)
    this.form.get(this.control.key).valueChanges.subscribe(x=> this.range = x)
  }

  writeValue(obj: any): void { }
  registerOnTouched(fn: any): void { }

  ngOnInit(): void {
    this.form.addControl(this.control.key, new FormControl(this.control.value))
    this.range = this.control.value;
  }

}
