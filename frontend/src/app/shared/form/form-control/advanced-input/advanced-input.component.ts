import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl, FormArray } from '@angular/forms';

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
  // onChange: () =>{}
  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.form.get(this.control.key).valueChanges.subscribe(fn)
  }

  registerOnTouched(fn: any): void {
    // this.onChange = fn
  }

  setDisabledState?(isDisabled: boolean): void { }

  // get map() {
  //   return this.form.get('map') as FormArray;
  // }

  get controls() {
    if ((this.defineControlType(this.control) == 'formGroup')) {
      return ((this.form.get(this.control.key) as FormGroup).controls.map as FormArray).controls
    }
    // : console.log('XYQ');

  }

  ngOnInit(): void {


    // this.control = {
    //   controlType: "checkbox",
    //   disabled: undefined,
    //   key: "amenities",
    //   label: "Choose amenities:",
    //   options: [
    //     // "Завтрак", "Бесплатный Wi-Fi"
    //     { id: 0, label: "Завтрак", checked: false },
    //     { id: 1, label: "Бесплатный Wi-Fi", checked: false }
    //   ],
    //   placeholder: "",
    //   required: true
    // }
    // this.defineControlType(control);

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
          // console.log('!', this.defineControlType(c));



          switch (this.defineControlType(c)) {

            case 'formControl':
              (this.form.get(this.control.key) as FormGroup)
                .addControl(c.key, new FormControl(null));
              break;

            case 'formArray':
              (this.form.get(this.control.key) as FormGroup)
                .addControl(c.key, new FormArray([]));



              // console.log('FFFAAA', this.control);
              c.options.forEach(o => {
                ((this.form.get(this.control.key) as FormGroup).controls[c.key] as FormArray)
                  .push(new FormControl(null))
              });

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

    // this.control.options.forEach(option => {

    //   // console.log(option);

    //   if (option.options) {
    //     (this.form as FormGroup).addControl(option.key, new FormArray([
    //       new FormControl(), new FormControl()
    //     ]));
    //     return;
    //   }

    //   (this.form as FormGroup).addControl(option.key, new FormControl(''));
    // })


  }

  defineControlType(control) {

    if (!control.options) {
      // console.log('this is formControl, formControl');
      return 'formControl';
    }

    if (control.options && !Array.isArray(control.options)) {
      // console.log('this is obj, formArray');
      return 'formArray';
    }

    if (control.options && Array.isArray(control.options)) {
      var hasOtherControls = control.options.some(c => c.hasOwnProperty('controlType'));

      if (hasOtherControls)
        return 'formGroup';

      return 'formArray';
    }

  }

  onCheckboxChange(checked: boolean, id, index: number) {
    checked
      ? this.addControl(id, index)
      : this.removeControl(index);
  }


  public addControl(id, i: number) {
    (this.form.get(this.control.key) as FormArray).push(new FormControl(id));
    this.control.options[i].checked = true;
  }

  public removeControl(i: number) {
    this.control.options[i].checked = false;
    (this.form.get(this.control.key) as FormArray).removeAt(i);
  }













  trackById(index, item) {
    return item.id;
  }

}
