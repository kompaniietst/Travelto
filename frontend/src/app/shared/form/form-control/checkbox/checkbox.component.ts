import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormArray, FormControl, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

  @Input() control: any;
  form: FormGroup = new FormGroup({})
  defaultData: any;

  constructor() { }

  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.form.get(this.control.key).valueChanges.subscribe(fn)
  }

  registerOnTouched(fn: any): void { }

  ngOnInit(): void {
    console.log('this.control.value', this.control.value);

    this.defaultData = this.control.value;

    if (this.defaultDataExist()) {

      (this.form as FormGroup)                      // if defaultDataExist fill FormArray with FormControls
        .addControl(this.control.key, new FormArray(
          this.defaultData.map(d => new FormControl(d))
        ));

      this.control.options
        .forEach(o => {                              // turn property "checked" of selected checboxes to true
          if (this.defaultData.some(d => o._id == d._id))
            o.checked = true
        })
      console.log('------F', this.form);

      return;
    }

    (this.form as FormGroup)
      .addControl(this.control.key, new FormArray([]));
  }

  onCheckboxChange(checked: boolean, id, index: number, item) { // on select checkbox
    checked
      ? this.addControl(item, index)
      : this.removeControl(index, id);
  }

  public addControl(item, i: number) {
    (this.form.get(this.control.key) as FormArray).push(new FormControl(item));
    this.control.options[i].checked = true;

    console.log(this.form);
    
  }

  public removeControl(i: number, id) {
    console.error('rem', i, 'id ', id, this.control.key, this.control.options);
    console.log('f', this.form);

    var index = (this.form.get(this.control.key) as FormArray).controls
      .findIndex(c => c.value._id == id)

    console.log('index', index);


    this.control.options[i].checked = false;
    (this.form.get(this.control.key) as FormArray).removeAt(index);
  }

  defaultDataExist() {
    return this.control.value ? true : false;
  }

  trackById(index, item) {
    return item.id;
  }
}
