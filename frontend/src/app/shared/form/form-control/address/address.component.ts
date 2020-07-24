import { Component, OnInit, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { log } from 'util';
import { Control } from 'src/app/core/models/Control';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressComponent),
    multi: true
  }]
})
export class AddressComponent implements OnInit, ControlValueAccessor {

  @Input() control: any;
  dropdownControl: Control;
  defaultData: any;

  form: FormGroup = new FormGroup({
    city: new FormControl(),
    street: new FormControl(),
    district: new FormControl(),
    houseNumber: new FormControl(),
    map: new FormArray([new FormControl(), new FormControl()])
  })

  get mapControls() { return (this.form.get("map") as FormArray).controls }

  @ViewChild(DropdownComponent) dropdownComponentRef: DropdownComponent;

  constructor() { }

  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn)
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit(): void {
    this.defaultData = this.control.options
      .filter(({ key, value }) => {
        if (key && value) return { key, value }
      })

    if (this.defaultDataExist())
      this.fillWithDefaultData();

    this.dropdownControl = this.control.options
      .find((c: Control) => c.controlType == "dropdown")
  }

  defaultDataExist(): boolean {
    return this.defaultData.length > 0;
  }

  fillWithDefaultData() {
    this.defaultData
      .forEach(({ key, value }) =>
        this.form.get(key)
          .setValue(value))
  }

  trackById(index, item) {
    return item.id;
  }
}
