import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Control } from 'src/app/core/models/Control';

@Component({
  selector: 'app-pex',
  templateUrl: './pex.component.html',
  styleUrls: ['./pex.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PexComponent),
    multi: true
  }]
})
export class PexComponent implements OnInit, ControlValueAccessor {

  @Input() control: Control;

  form = new FormGroup({});
  openPanel: boolean = false;

  constructor() { }

  get adults() { return this.form.get('adults').value }
  get children() { return this.form.get('children').value }
  get ages() { return this.form.get('ages') as FormArray }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn)
  }

  writeValue(obj: any): void { }
  registerOnTouched(fn: any): void { }

  ngOnInit(): void {
    console.log(this.control);

    this.form.addControl('adults', new FormControl(this.control.value.adults));
    this.form.addControl('children', new FormControl(this.control.value.children));
    this.form.addControl('ages', new FormArray([]));

    this.form.controls.children.valueChanges
      .subscribe(x => {
        console.log(x);

        x > this.ages.controls.length
          ? this.addAgeControl()
          : this.removeAgeControl()
      });
  }

  addAgeControl() {
    console.log('add');

    (this.form.get('ages') as FormArray)
      .push(new FormControl(0))
  }

  removeAgeControl() {
    (this.form.get('ages') as FormArray)
      .removeAt((this.form.get('ages') as FormArray).controls.length - 1)
  }

}
