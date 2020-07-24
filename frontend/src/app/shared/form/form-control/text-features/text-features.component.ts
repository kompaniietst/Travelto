import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { Control } from 'src/app/core/models/Control';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';

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

  array: FormArray = new FormArray([]);
  form: FormGroup = new FormGroup({});
  defaultData: any;

  get controls() { return (this.array as FormArray).controls }

  registerOnChange(fn: any): void {
    (this.array as FormArray).valueChanges.subscribe(fn)
  }

  writeValue(obj: any): void { }

  registerOnTouched(fn: any): void { }

  ngOnInit(): void {
    this.defaultData = this.control.value;

    if (this.defaultDataExist()) {
      var generatedControls = this.defaultData
        .map((v: string) => new FormControl(v));

      generatedControls.forEach((control: AbstractControl) =>
        this.array.push(control))
    }
    else
      this.array.push(new FormControl());

    this.form.addControl('array', this.array);
  }

  defaultDataExist() {
    return this.control.value ? true : false;
  }

  addField() {
    (this.array as FormArray).push(new FormControl());
  }

  removeField(i) {
    (this.array as FormArray).removeAt(i)
  }

  trackById(index, item) {
    return item.id;
  }
}
