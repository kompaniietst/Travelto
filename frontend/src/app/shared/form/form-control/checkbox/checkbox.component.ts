import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormArray, FormControl, ControlValueAccessor, AbstractControl } from '@angular/forms';
import { FilterTabsService } from 'src/app/core/services/filter-tabs.service';
import { Router } from '@angular/router';
import { FilterItem } from 'src/app/core/models/FilterItem';

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
  form: FormGroup = new FormGroup({});
  array: FormArray;
  defaultData: any;
  allCheckboxes: any;

  constructor(
    private filterTabsService: FilterTabsService,
    private router: Router) { }

  registerOnChange(fn: any) {
    this.form.get(this.control.key).valueChanges.subscribe(fn)
  }

  writeValue(obj: any): void { }

  registerOnTouched(fn: any): void { }

  ngOnInit(): void {
    this.allCheckboxes = this.control.options;
    this.defaultData = this.control.value;

    this.array = new FormArray([]);

    if (this.defaultDataExist())
      this.fillWithDefaultData(this.defaultData);

    if (this.currPageIsCatalog())
      this.fillWithTabsData()

    this.form.addControl(this.control.key, this.array);

    this.onFilterTabRemove();
  }

  fillWithTabsData() {
    this.filterTabsService.getFilters()
      .subscribe((filters: FilterItem[]) => {
        if (filters) {
          this.defaultData = filters.reduce((r, a) => {
            r[a.type] = [...r[a.type] || [], a];
            return r;
          }, {});

          for (const key in this.defaultData) {
            this.fillWithDefaultData(this.defaultData[key])
          }
        }
      })
  }

  fillWithDefaultData(data) {
    var generatedControls = data
      .map((v: string) => new FormControl(v));

    generatedControls.forEach((control: AbstractControl) =>
      this.array.push(control))

    this.allCheckboxes.forEach((checkbox: FilterItem) => {                       // turn property "checked" of selected checboxes (in html) to true
      if (data.some(({ _id }) => checkbox._id == _id))
        checkbox.checked = true;
    })
  }

  defaultDataExist(): boolean {
    return this.control.value ? true : false;
  }

  onFilterTabRemove() {
    this.filterTabsService.getRemovedTabID()                        // uncheck checkbox after removing of filter tab
      .subscribe((tab_id: string) => {
        if (tab_id.length > 0) {
          console.log('HERE');

          this.removeControl(tab_id)
        }
      })
  }

  onCheckboxSelect(checked: boolean, i: number, item: any) {         // on select checkbox
    console.log('onCheckboxSelect');

    checked
      ? this.addControl(item, i)
      : this.removeControl(item._id);

    if (this.currPageIsCatalog())
      this.setFilterTabs(checked, item);
  }

  currPageIsCatalog(): boolean {
    return this.router.url.includes('catalog')
  }

  public addControl(item: any, i: number) {
    this.array.push(new FormControl(item));
    this.allCheckboxes[i].checked = true;
  }

  public removeControl(_id: string) {

    var index = this.array.controls                                   // remove control from Form
      .findIndex((c: AbstractControl) => c.value._id == _id);

    this.array.removeAt(index);

    var controlOptionsIndex = this.control.options                     //change checked state in control.options
      .findIndex((c: FilterItem) => c._id == _id);

    if (controlOptionsIndex != -1) this.allCheckboxes[controlOptionsIndex].checked = false;
  }

  setFilterTabs(checked: boolean, item: any) {
    checked
      ? this.filterTabsService.setFilter({
        _id: item._id,
        type: this.control.key,
        label: item.label
      })
      : this.filterTabsService.remove(item._id);
  }

  trackById(index, item) {
    return item.id;
  }
}
