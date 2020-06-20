import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { Control } from 'src/app/core/models/Control';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-features',
  templateUrl: './text-features.component.html',
  styleUrls: ['./text-features.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextFeaturesComponent),
    multi: true
  }]
})

export class TextFeaturesComponent implements OnInit, ControlValueAccessor {

  @Input() control: Control;

  form: FormGroup = new FormGroup({});

  defaultData: any;

  get controls() {
    return (this.form.get(this.control.key) as FormArray).controls
  }

  constructor() { }
  writeValue(obj: any): void { }
  registerOnTouched(fn: any): void { }

  registerOnChange(fn: any): void {
    (this.form.get(this.control.key) as FormArray).valueChanges.subscribe(fn)
  }

  ngOnInit(): void {
    this.defaultData = this.control.value;

    if (this.defaultDataExist()) {
      var formControls = this.defaultData.map(d => new FormControl(d))
      this.form.addControl(this.control.key, new FormArray(formControls))
    }

    this.form.addControl(this.control.key, new FormArray([new FormControl()]))
  }

  addField() {
    (this.form.get(this.control.key) as FormArray).push(new FormControl());
  }

  removeField(i) {
    (this.form.get(this.control.key) as FormArray).removeAt(i)
  }

  defaultDataExist() {
    return this.control.value ? true : false;
  }
  
  trackById(index, item) {
    return item.id;
  }
}
