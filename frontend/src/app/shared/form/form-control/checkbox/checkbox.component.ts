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

  constructor() { }

  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.form.get(this.control.key).valueChanges.subscribe(fn)
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit(): void {
    (this.form as FormGroup)
      .addControl(this.control.key, new FormArray([]));
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
