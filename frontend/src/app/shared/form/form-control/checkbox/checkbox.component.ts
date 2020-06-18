import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormArray, FormControl, ControlValueAccessor } from '@angular/forms';
import { FilterTabsService } from 'src/app/core/services/filter-tabs.service';

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

  constructor(private filterTabsService: FilterTabsService) {

    this.filterTabsService.getRemovedTabID()          // uncheck checkbox after removing of filter tab
      .subscribe((tab_id: string) => {
        if (this.control)
          this.removeControl(tab_id)
      })
  }

  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.form.get(this.control.key).valueChanges.subscribe(fn)
  }

  registerOnTouched(fn: any): void { }

  ngOnInit(): void {
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

      return;
    }

    (this.form as FormGroup)
      .addControl(this.control.key, new FormArray([]));
  }

  onCheckboxChange(checked: boolean, i: number, item: any) { // on select checkbox
    checked
      ? this.addControl(item, i)
      : this.removeControl(item._id);

    this.setFilterTabs(checked, item);
  }

  public addControl(item: any, i: number) {
    (this.form.get(this.control.key) as FormArray).push(new FormControl(item));
    this.control.options[i].checked = true;
  }

  public removeControl(_id) {

    // remove control from Form
    var controlIndex = (this.form.get(this.control.key) as FormArray).controls.findIndex(c => c.value._id == _id)

    if (controlIndex != -1)
      (this.form.get(this.control.key) as FormArray).removeAt(controlIndex);

    // change "checked" state of curr checbox
    var controlOptIndex = this.control.options.findIndex(c => c._id == _id)

    if (controlOptIndex != -1)
      this.control.options[controlOptIndex].checked = false;

  }

  defaultDataExist() {
    return this.control.value ? true : false;
  }

  setFilterTabs(checked: boolean, item: any) {
    checked
      ? this.filterTabsService.set(item)
      : this.filterTabsService.remove(item._id);
  }

  trackById(index, item) {
    return item.id;
  }
}
