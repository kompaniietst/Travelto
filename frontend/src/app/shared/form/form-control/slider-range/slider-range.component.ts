import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { Control } from 'src/app/core/models/Control';
import { FilterTabsService } from 'src/app/core/services/filter-tabs.service';

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
  formControl = new FormControl();
  range: number[];
  defaultData: any;

  constructor(private filterTabsService: FilterTabsService) { }

  get form_control() { return this.formControl }

  registerOnChange(fn: any): void {
    this.formControl.valueChanges.subscribe(fn)
  }

  writeValue(obj: any): void { }

  registerOnTouched(fn: any): void { }

  ngOnInit(): void {
    this.defaultData = this.control.value;

    if (this.defaultDataExist()) {
      this.formControl.setValue(this.defaultData);
      this.range = this.defaultData;
    }

    this.formControl.valueChanges.subscribe(x => {
      this.range = x;
      this.filterTabsService.setPriceFilter(x);
    })
  }

  defaultDataExist() {
    return this.control.value ? true : false;
  }
}
