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
  paxGroup: FormGroup;

  openPanel: boolean = false;
  cityControl: Control;
  dateControl: Control;

  adults: number = 0;
  children: number = 0;
  ages: FormArray;
  maxCildrenPerRoom: number = 4;

  constructor(
    private citiesService: CitiesService,
    private router: Router,
    private ls: LocalStorageService) {

    var lsData = this.ls.getData() as LsSearchData;
    this.initCityControl(lsData);
    this.initDateControl(lsData);
    this.paxGroup = this.getInitializedPaxGroup(lsData);

    this.form = new FormGroup({
      city: new FormControl(lsData?.city),
      date: new FormControl(lsData?.date),
      pex: this.paxGroup
    });
  }

  getInitializedPaxGroup(lsData: LsSearchData): FormGroup {

    var adults = new FormControl(lsData?.pex?.adults ?? 0);
    adults.valueChanges.subscribe(x => this.adults = x);

    this.ages = new FormArray(lsData?.pex?.ages?.map(n => new FormControl(n)) ?? []);

    var childrenControl = this.initChildrenControl(lsData)

    this.adults = lsData?.pex?.adults ?? 0
    this.children = lsData?.pex?.children ?? 0

    return new FormGroup({
      adults: adults,
      children: childrenControl,
      ages: this.ages,
    });
  }

  initChildrenControl(lsData: LsSearchData) : FormControl {
    var childrenControl = new FormControl(lsData?.pex?.children ?? 0);
    childrenControl.valueChanges.subscribe((x: number) => {

      var agesControlsAmount = this.ages.controls.length;
      if (x < 0 || x === agesControlsAmount)
        return;

      x > agesControlsAmount
        ? this.ages.push(new FormControl(0))
        : this.ages.removeAt(agesControlsAmount - 1)

      this.children = x;
    });
    return childrenControl;
  }

  ngOnInit(): void { }

  private initDateControl(lsData: LsSearchData) {
    this.dateControl = new Control({
      controlType: 'dateTimePicker',
      key: 'date',
      placeholder: 'Check in - check out',
      value: lsData.date || ''
    });
  }

  private initCityControl(lsData: LsSearchData) {
    this.citiesService.get()
      .subscribe((allCities: City[]) => this.cityControl = new Control({
        controlType: 'dropdown',
        key: 'city',
        placeholder: 'Destination place',
        value: lsData.city,
        options: allCities
      }));
  }

  paxControlIsEmpty() {
    return this.paxGroup.get('adults').value === 0
      && this.paxGroup.get('children').value === 0
      && this.paxGroup.get('ages').value.length === 0
  }

  onSubmit() {
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

    this.router.navigate(['catalog'], { queryParams: queryParams })
  }

  trackById(index, item) {
    return item.id;
  }
}
