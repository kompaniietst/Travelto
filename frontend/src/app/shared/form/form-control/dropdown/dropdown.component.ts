import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Control } from 'src/app/core/models/Control';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    },
    {
      provide: MatFormFieldControl, useExisting: DropdownComponent
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {

  @Input() control: Control;

  formControl = new FormControl();
  filteredOptions: Observable<any>;

  onChange = (val) => { }

  ngOnInit(): void {
    if (this.control.key == "city")
      this.formControl.setValue(this.control.value)

    this.formControl.valueChanges.subscribe(x => this.onChange(x))
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(obj: any): void { }

  registerOnTouched(fn: any): void { }

  displayFn(option) {
    return option?.name;
  }

  trackById(index, item) {
    return item.id;
  }
}
