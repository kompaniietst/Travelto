import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl, FormArray } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FilterTabsService } from 'src/app/core/services/filter-tabs.service';
import { City } from 'src/app/core/models/City';

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

  @Input() control: any;
  @Input() lsData: City;

  onChange = (val) => { }

  formControl = new FormControl();

  filteredOptions: Observable<any>;

  constructor(private filterTabsService: FilterTabsService) {

    this.formControl.valueChanges.subscribe(x => {          // set filter tab
      if (x) this.filterTabsService.set(x)                  // TODO remove from tabs, if uncheck
    })

    this.filterTabsService.getRemovedTabID()                // uncheck checkbox after removing of filter tab
      .subscribe((tab_id: string) => {
        if (this.control && this.formControl?.value?._id == tab_id) {
          this.formControl.reset();
        }
      })
  }

  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void { }

  ngOnInit(): void {
    console.log('lsData', this.lsData);


    if (this.control.value) {
      this.formControl.setValue(this.control.value)
    }

    if (this.lsData) {
      this.formControl.setValue(this.lsData)
    }

    this.filteredOptions = this.formControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)));

    this.formControl.valueChanges.subscribe(x => this.onChange(x))

    this.formControl.valueChanges.subscribe(x => console.log(x))
  }

  private _filter(value: string) {

    const filterValue = value.toLowerCase();

    return this.control.options.filter(option => {
      if (option.label.toLowerCase().includes(filterValue))
        return option;
    })

  }

  displayFn(option) {
    return option?.label;
  }

  trackById(index, item) {
    return item.id;
  }
}
