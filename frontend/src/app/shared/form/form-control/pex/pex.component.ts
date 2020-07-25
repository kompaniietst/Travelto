import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Control } from 'src/app/core/models/Control';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-pex',
  templateUrl: './pex.component.html',
  styleUrls: ['./pex.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PexComponent),
    multi: true
  }]
})
export class PexComponent implements OnInit, ControlValueAccessor {

  @Input() control: Control;

  form = new FormGroup({});
  openPanel: boolean = false;
  adults: number;
  children: number;

  constructor(private ls: LocalStorageService) {
    var localstorageData = this.ls.getData();

    this.form = new FormGroup({
      adults: new FormControl(localstorageData?.pex?.adults ?? 0),
      children: new FormControl(localstorageData?.pex?.children ?? 0),
      ages: new FormArray(localstorageData?.pex?.ages ?? [])
    });

    this.adults = localstorageData?.pex?.adults ?? 0;
    this.children = localstorageData?.pex?.children ?? 0;
  }

  get ages() { return this.form.get('ages') as FormArray }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn)
  }

  writeValue(obj: any): void { }

  registerOnTouched(fn: any): void { }

  ngOnInit(): void {


    console.log('control=> ', this.control);

    this.form.get("adults").valueChanges
      .subscribe((x: number) => this.adults = x);


    this.form.get("children").valueChanges
      .subscribe((x: number) => {
        console.log(x);

        this.children = x

        x > this.ages.controls.length
          ? this.ages.push(new FormControl(0))
          : this.ages.removeAt(this.ages.controls.length - 1)
      });
  }

  // addAgeControl() {
  //   console.log('add');

  //   (this.form.get('ages') as FormArray)
  //     .push(new FormControl(0))
  // }

  // removeAgeControl() {
  //   (this.form.get('ages') as FormArray)
  //     .removeAt((this.form.get('ages') as FormArray).controls.length - 1)
  // }

  trackById(index, item) {
    return item.id;
  }
}