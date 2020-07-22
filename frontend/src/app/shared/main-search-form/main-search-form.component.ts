import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CitiesService } from 'src/app/core/services/cities.service';
import { City } from 'src/app/core/models/City';
import { Params, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import * as moment from 'moment';
import { Control } from 'src/app/core/models/Control';
import { LsSearchData } from 'src/app/core/models/LsSearchData';

@Component({
  selector: 'app-main-search-form',
  templateUrl: './main-search-form.component.html',
  styleUrls: ['./main-search-form.component.scss']
})

export class MainSearchFormComponent implements OnInit {

  form: FormGroup;
  pexGroup: FormGroup;

  openPanel: boolean = false;
  cityControl: Control;
  dateControl: Control;
  lsData: LsSearchData;

  adults: number = 0;
  children: number = 0;

  constructor(
    private citiesService: CitiesService,
    private router: Router,
    private ls: LocalStorageService) {

    this.form = new FormGroup({
      city: new FormControl(),
      date: new FormControl(),
    });

    this.lsData = this.ls.getData() as LsSearchData;

    this.fillByLocalstorageData(this.lsData);

    // this.pexGroup = this.form.get('pex') as FormGroup

  }

  // get adults() { return this.form.get('pex') ? this.form.get('pex').get('adults').value : 0 }
  // get children() { return this.pexGroup ? this.pexGroup.get('children').value : 0 }
  get ages() { return this.form.get('pex').get('ages') as FormArray }

  ngOnInit(): void {

    this.citiesService.get()
      .subscribe((x: City[]) =>
        this.cityControl = new Control({
          controlType: 'dropdown',
          key: 'city',
          placeholder: 'Destination place',
          value: this.lsData.city || 'dddddd',
          options: x
        }));

    this.dateControl = new Control({
      controlType: 'dateTimePicker',
      key: 'date',
      placeholder: 'Check in - check out',
      value: this.lsData.date || ''
    });
  }

  triggerPexPanel() {
    if (!this.openPanel) {
      //   console.log('not openpanel');

      this.openPanel = true;

      this.addPexGroup();
      return
    }

    if (this.openPanel && this.pexIsEmpty()) {
      this.openPanel = false;
      //   this.form.removeControl('pex');
      return
    }

    this.openPanel = false;
  }

  addPexGroup() {
    var pex = new FormGroup({
      adults: new FormControl(0),
      children: new FormControl(0),
      ages: new FormArray([]),
    })

    this.form.addControl("pex", pex);

    // if (this.lsData?.pex)
    //   this.fillByLocalstorageData(pex);

    pex.get('adults').valueChanges
      .subscribe(x => this.adults = x)

    pex.get('children').valueChanges
      .subscribe(x => {
        x > this.ages.controls.length
          ? this.addAgeControl()
          : this.removeAgeControl()
        this.children = x;
      });
  }

  fillByLocalstorageData(data: LsSearchData) {

    for (const key in data) {
      console.log('key', key, 'data', data[key]);

      if (key == "pex") {

        this.adults = this.lsData.pex.adults
        this.children = this.lsData.pex.children

        this.form.addControl("pex", new FormGroup({
          adults: new FormControl(0),
          children: new FormControl(0),
          ages: new FormArray([]),
        }))

        for (const pexKey in data.pex) {
          // console.log('pexKey', pexKey, data.pex[pexKey]);
          // if (pexKey == "ages") continue;
          if (pexKey == "ages") {

            // this.form.addControl("pex", new FormArray())

            data.pex["ages"].forEach(age => {
              (this.form.get("pex").get('ages') as FormArray).push(new FormControl(age))
            })
          }
          // else
          this.form.get("pex").get(pexKey).setValue(data.pex[pexKey]);
        }
      }
      else
        this.form.get(key).setValue(data[key]);


    }

    // if (this.lsData.pex.adults > 0) {
    //   pex.get('adults').setValue(this.lsData.pex.adults);
    // }

    // if (this.lsData.pex.children > 0)
    //   pex.get('children').setValue(this.lsData.pex.children)

    // console.log('this.lsData.pex.ages', this.lsData.pex.ages, pex.get('ages'));

    // if (this.lsData.pex.ages.length > 0)
    //   this.lsData.pex.ages.forEach(age => {
    //     (pex.get('ages') as FormArray).push(new FormControl(age))
    //   })
  }

  pexIsEmpty() {
    let pexGroup = this.form.get('pex')

    return pexGroup.get('adults').value === 0
      && pexGroup.get('children').value === 0
      && pexGroup.get('ages').value.length === 0
  }

  addAgeControl() {
    (this.form.get('pex').get('ages') as FormArray)
      .push(new FormControl(0))
  }

  removeAgeControl() {
    let ages = (this.form.get('pex').get('ages') as FormArray);
    ages.removeAt(ages.controls.length - 1)
  }

  onSubmit() {
    console.log('value ', this.form);
    let formData = this.form.value;

    const queryParams: Params = {};

    if (formData.city != null)
      queryParams["placeId"] = formData.city._id;

    if (formData.city == null)
      delete formData.city;

    if (formData.date == null)
      delete formData.date;

    if (formData.date) {
      queryParams["checkIn"] = moment(formData.date[0]).format("DD.MM.YYYY")
      queryParams["checkOut"] = moment(formData.date[1]).format("DD.MM.YYYY")
    }

    console.log('FORMDATA ', formData);

    if (Object.keys(formData).length > 0)
      this.ls.saveToLocalstorage(formData);

    // this.router.navigate(['catalog'], { queryParams: queryParams })
  }

  trackById(index, item) {
    return item.id;
  }
}
