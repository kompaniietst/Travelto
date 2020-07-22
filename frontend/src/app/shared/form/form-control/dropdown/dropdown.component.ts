import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl, FormArray } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FilterTabsService } from 'src/app/core/services/filter-tabs.service';
import { City } from 'src/app/core/models/City';
import { Control } from 'src/app/core/models/Control';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
  },
  { provide: MatFormFieldControl, useExisting: DropdownComponent }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {

  @Input() control: Control;
  @Input() lsData: City;

  formControl = new FormControl();
  filteredOptions: Observable<any>;

  onChange = (val) => { }

  ngOnInit(): void {

    // if (this.control.value) {
    //   this.formControl.setValue(this.control.value)
    // }

    console.log('CONTROL', this.control);

    if (this.control.key == "city") {
      this.formControl.setValue(this.control.value)
    }
    // this.filteredOptions = this.formControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value)));

    this.formControl.valueChanges.subscribe(x => this.onChange(x))
  }

  writeValue(obj: any): void {
    // throw new Error("Method not implemented.");
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // throw new Error("Method not implemented.");
  }


  //   @Input() control: any;
  //   @Input() lsData: City;

  //   onChange = (val) => { }

  //   formControl = new FormControl();

  //   filteredOptions: Observable<any>;

  //   constructor() { }

  //   writeValue(obj: any): void { }

  //   registerOnChange(fn: any): void {
  //     this.onChange = fn;
  //   }
  //   registerOnTouched(fn: any): void { }

  //   ngOnInit(): void {
  //     console.log('this.control.value', this.control.value);

  //     if (this.control.value) {
  //       this.formControl.setValue(this.control.value)
  //     }

  // console.log('dropdoen',this.lsData, this.control);

  //     // if (this.lsData && this.control.key == "city") {
  //     //   this.formControl.setValue(this.lsData)
  //     // }
  //     this.filteredOptions = this.formControl.valueChanges
  //     .pipe(
  //       startWith(''),
  //       map(value => this._filter(value)));

  //     this.formControl.valueChanges.subscribe(x => this.onChange(x))
  //   }

  //   private _filter(value: string) {

  //     const filterValue = value.toLowerCase();

  //     return this.control.options.filter(option => {
  //       if (option.label.toLowerCase().includes(filterValue))
  //         return option;
  //     })

  //   }

  displayFn(option) {
    return option?.label;
  }

  trackById(index, item) {
    return item.id;
  }
}
