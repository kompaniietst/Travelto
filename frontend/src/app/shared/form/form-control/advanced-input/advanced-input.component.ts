import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';

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
              (this.form.get(this.control.key) as FormGroup)
                .addControl(c.key, new FormControl(null));
              break;

            case 'formArray':
              console.log("CITY", c.controlType);

              if (c.controlType == "input") {

                (this.form.get(this.control.key) as FormGroup)
                  .addControl(c.key, new FormArray([]));

                c.options.forEach(o => {
                  ((this.form.get(this.control.key) as FormGroup).controls[c.key] as FormArray)
                    .push(new FormControl(null))
                });
              }


              if (c.controlType == "dropdown") {

                (this.form.get(this.control.key) as FormGroup)
                  .addControl(c.key, new FormControl());

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

    console.log('--FORM', this.form);

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
