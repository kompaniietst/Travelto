import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { GenerateFormStructureService } from 'src/app/core/services/generate-form-structure.service';
import { Control } from 'src/app/core/models/Control';
import { Observable } from 'rxjs';
import { ImagesComponent } from './form-control/images/images.component';
import { CheckboxComponent } from './form-control/checkbox/checkbox.component';
import { AddressComponent } from './form-control/address/address.component';
import { ConvertToFormStructureService } from 'src/app/core/services/convert-to-form-structure.service';
import { FilterTabsService } from 'src/app/core/services/filter-tabs.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [GenerateFormStructureService]
})
export class FormComponent<T> implements OnInit {

  @Input() controls$: Observable<Control[]>;
  @Input() buttonName: string;
  @Input() showSpinner: string;
  @Input() defaultData: any;

  @Input() headerTemplate: TemplateRef<any>;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<any>;

  @Output() valueChange = new EventEmitter();

  localstorageData: any;

  @ViewChild(CheckboxComponent) checkboxComponentRef: CheckboxComponent;

  form: FormGroup;

  constructor(
    private generateForm: GenerateFormStructureService,
    private alert: AlertMessageService,
    private ls: LocalStorageService
  ) {

    // if (this.localstorageNotEmpty)
    //   this.ls.get().subscribe(x => this.localstorageData = x);                           // get localstorage data
  }

  localstorageNotEmpty() {
    return Object.keys(this.ls.get()).length > 0;
  }

  ngOnInit() {

    // this.controls$.subscribe(x => console.log('CONTROLS: ', x))
    this.form = this.generateForm.defineStructure(this.controls$);

    if (this.defaultData) {
      // console.log('==defaultData==', this.defaultData);
      // console.log('==form==', this.form);

      for (const key in this.defaultData) {
        var value = this.defaultData[key];

        if (key == '_id' || key == 'feedbacks' || key == '__v') return
        // console.log(key, value == null);

        if (value == null)
          return;

        this.form.get(key).setValue(value)
      }

    }

    // if (this.localstorageData) {

    //   //  if there are data in the LocalStorage
    //   for (const key in this.localstorageData) {

    //     if (this.form.get(key))
    //       this.form.get(key).setValue(this.localstorageData[key])
    //   }
    // }

  }

  onSubmit() {
    console.log('VALID ', this.form.valid);
    if (!this.form.valid) {
      this.alert.valid_error('Please, fill all required fields');
    }


    this.valueChange.emit(this.form.value);
    // console.log('form.value', this.form.value);
    // this.resetForm();
  }

  // resetForm() {
  //   this.form = this.generateForm.defineStructure(this.controls$);
  //   this.imagesComponentRef.cleanControl();
  //   this.checkboxComponentRef.cleanControl();
  //   this.advancedInputComponentRef.dropdownComponentRef.cleanControl();
  // }

  trackById(index, item) {
    return item.id;
  }
}
