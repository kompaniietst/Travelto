import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { GenerateFormStructureService } from 'src/app/core/services/generate-form-structure.service';
import { Control } from 'src/app/core/models/Control';
import { Observable } from 'rxjs';
import { ImagesComponent } from './form-control/images/images.component';
import { CheckboxComponent } from './form-control/checkbox/checkbox.component';
import { AdvancedInputComponent } from './form-control/advanced-input/advanced-input.component';
import { ConvertToFormStructureService } from 'src/app/core/services/convert-to-form-structure.service';
import { FilterTabsService } from 'src/app/core/services/filter-tabs.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

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

  lsData: any;

  // @ViewChild(ImagesComponent) imagesComponentRef: ImagesComponent;
  @ViewChild(CheckboxComponent) checkboxComponentRef: CheckboxComponent;
  // @ViewChild(AdvancedInputComponent) advancedInputComponentRef: AdvancedInputComponent;

  form: FormGroup;

  constructor(
    private generateForm: GenerateFormStructureService,
    private ls: LocalStorageService
  ) {
    
    var localstorageData = this.ls.get();
    if (localstorageData)
      this.ls.get().subscribe(x => this.lsData = x);                           // get localstorage data
  }

  ngOnInit() {

    this.controls$.subscribe(x => console.log('CONTROLS: ', x))
    this.form = this.generateForm.defineStructure(this.controls$);

    if (this.defaultData) {
      // console.log('==defaultData==', this.defaultData);
      // console.log('==form==', this.form);

      for (const key of Object.keys(this.defaultData)) {
        var value = this.defaultData[key];
        // console.log(key, value);

        if (key == '_id' || key == 'feedbacks' || key == '__v') continue

        this.form.get(key).setValue(value)
      }
    }

    if (this.lsData) {

      //  if there are data in the LocalStorage
      for (const key of Object.keys(this.lsData)) {

        if (this.form.get(key))
          this.form.get(key).setValue(this.lsData[key])
      }
    }

  }

  onSubmit() {
    this.valueChange.emit(this.form.value);
    // console.log('form.value',this.form.value);
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
