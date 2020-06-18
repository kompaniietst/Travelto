import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl, FormArray } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FilterTabsService } from 'src/app/core/services/filter-tabs.service';

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

  onChange = (val) => { }

  myControl = new FormControl();

  filteredOptions: Observable<any>;

  constructor(private filterTabsService: FilterTabsService) {

    this.myControl.valueChanges.subscribe(x => {            // set filter tab
      if (x) this.filterTabsService.set(x)                  // TODO remove from tabs, if uncheck
    })

    this.filterTabsService.getRemovedTabID()                // uncheck checkbox after removing of filter tab
      .subscribe((tab_id: string) => {
        if (this.control && this.myControl?.value?._id == tab_id) {
          this.myControl.reset();
        }
      })
  }

  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void { }

  ngOnInit(): void {
    if (this.control.value) {
      this.myControl.setValue(this.control.value)
    }

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)));

    this.myControl.valueChanges.subscribe(x => this.onChange(x))

    this.myControl.valueChanges.subscribe(x => console.log(x))
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
}
