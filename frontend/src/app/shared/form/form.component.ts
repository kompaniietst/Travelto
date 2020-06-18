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

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [GenerateFormStructureService]
})
export class FormComponent<T> implements OnInit {

  @Input() controls$: Observable<Control[]>;
  @Input() defaultData: any;
  @Input() buttonName: string;
  @Input() showSpinner: string;

  @Input() headerTemplate: TemplateRef<any>;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<any>;

  @Output() valueChange = new EventEmitter();

  // @ViewChild(ImagesComponent) imagesComponentRef: ImagesComponent;
  @ViewChild(CheckboxComponent) checkboxComponentRef: CheckboxComponent;
  // @ViewChild(AdvancedInputComponent) advancedInputComponentRef: AdvancedInputComponent;

  form: FormGroup;

  constructor(
    private generateForm: GenerateFormStructureService,
    private filterTabsService: FilterTabsService
  ) {

    if (this.form != undefined)
      console.log('NOT UNDEF');
  }
/* 
    this.filterTabsService.getRemovedTabID()
      .subscribe(x => {
        console.log(' ');
        console.log('TABS CHANGE', x);

        // var i = (this.form.get('amenities') as FormArray).controls
        //   .findIndex(c => c.value._id == x);

        // console.log((this.form.get('amenities') as FormArray).controls);



this.unc(x);
        
        console.log('FORM', this.form);




        // console.log(this.form);

        // var index = (this.form.get('amenities') as FormArray).controls
        //   .findIndex(c => c.value._id == x);

        // console.log(index);

        // console.log((this.form.get('amenities') as FormArray).value);



        // this.checkboxComponentRef.removeControl(x)
      }, err => console.log(err))

    // this.filterTabsService.getRemovedTabID().subscribe(x => console.log('GET', x))

  }

  unc(x){
    console.log('X',x);
    this.checkboxComponentRef.removeControl(x)
  } */
  ngOnInit() {

    this.controls$.subscribe(x => console.log(x))
    this.form = this.generateForm.defineStructure(this.controls$);

    if (this.defaultData) {

      for (const key of Object.keys(this.defaultData)) {
        var value = this.defaultData[key];

        if (key == '_id' || key == 'feedbacks' || key == '__v') continue

        // console.log('key', key, this.form.get(key));

        this.form.get(key).setValue(value)
      }
    }

    console.log('===', (this.form.get('amenities')));

  }

  onSubmit() {
    this.valueChange.emit(this.form.value);
    console.log(this.form.value);
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
