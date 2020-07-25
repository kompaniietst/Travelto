import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import * as moment from 'moment';
import { Control } from 'src/app/core/models/Control';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateTimePickerComponent),
    multi: true
  }]
})
export class DateTimePickerComponent implements OnInit, ControlValueAccessor {

  @Input() control: Control;
  formControl = new FormControl();
  defaultData: any;

  constructor(private ls: LocalStorageService) { }

  registerOnChange(fn: any): void {
    this.formControl.valueChanges
      .pipe(
        map(d => [d.startDate.toDate(), d.endDate.toDate()]))
      .subscribe(fn)
  }

  writeValue(obj: any): void { }

  registerOnTouched(fn: any): void { }

  ngOnInit(): void {
    console.log('C',this.control);
    
    this.defaultData = this.control?.value;

    if (this.defaultDataExist())
      this.fillByDataFromLocalstorage();
  }

  defaultDataExist(): boolean {
    return this.control?.value ? true : false;
  }

  fillByDataFromLocalstorage() {
    this.formControl.setValue({
      startDate: moment(this.control.value[0]),
      endDate: moment(this.control.value[1])
    });
  }
}
