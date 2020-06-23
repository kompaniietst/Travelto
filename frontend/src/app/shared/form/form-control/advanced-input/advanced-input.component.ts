import { Component, OnInit, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { log } from 'util';

@Component({
  selector: 'app-advanced-input',
  templateUrl: './advanced-input.component.html',
  styleUrls: ['./advanced-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AdvancedInputComponent),
    multi: true
  }]
})
export class AdvancedInputComponent implements OnInit, ControlValueAccessor {

  @Input() control: any;
  form: FormGroup = new FormGroup({})

  @ViewChild(DropdownComponent) dropdownComponentRef: DropdownComponent;

  constructor() { }

  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.form.get(this.control.key).valueChanges.subscribe(fn)
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit(): void {

    switch (this.defineControlType(this.control)) {
      case 'formControl':
        (this.form as FormGroup)
          .addControl(this.control.key, new FormControl());
        break;

      case 'formArray':
        (this.form as FormGroup)
          .addControl(this.control.key, new FormArray([]));
        break;

      case 'formGroup':
        (this.form as FormGroup)
          .addControl(this.control.key, new FormGroup({}));

        this.control.options.forEach(c => {



          switch (this.defineControlType(c)) {

            case 'formControl':

              console.log('c', c);

              (this.form.get(this.control.key) as FormGroup)
                .addControl(c.key, new FormControl(c.value || null));
              break;

            case 'formArray':

              if (c.controlType == "input") {      // MAP
                var map = [new FormControl(), new FormControl()];



                if (c.value) {

                  map = c.value.map(v => new FormControl(v))
                }

                (this.form.get(this.control.key) as FormGroup)
                  .addControl(c.key, new FormArray(map));


              }


              if (c.controlType == "dropdown") {

                (this.form.get(this.control.key) as FormGroup)
                  .addControl(c.key, new FormControl(c.value));

              }

              break;

            case 'formGroup':
              break;

            default:
              break;
          }






        })
        break;

      default:
        break;
    }



  }

  defineControlType(control) {

    if (!control.options) {
      return 'formControl';
    }

    if (control.options && !Array.isArray(control.options)) {
      return 'formArray';
    }

    if (control.options && Array.isArray(control.options)) {
      var hasOtherControls = control.options.some(c => c.hasOwnProperty('controlType'));

      if (hasOtherControls)
        return 'formGroup';

      return 'formArray';
    }

  }

  trackById(index, item) {
    return item.id;
  }

}
