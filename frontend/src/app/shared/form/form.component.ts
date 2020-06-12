import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenerateFormStructureService } from 'src/app/core/services/generate-form-structure.service';
import { Control } from 'src/app/core/models/Control';
import { Observable } from 'rxjs';
import { ImagesComponent } from './form-control/images/images.component';
import { CheckboxComponent } from './form-control/checkbox/checkbox.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { DropdownComponent } from './form-control/dropdown/dropdown.component';
import { AdvancedInputComponent } from './form-control/advanced-input/advanced-input.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [GenerateFormStructureService]
})
export class FormComponent implements OnInit {

  @Input() controls$: Observable<Control[]>;
  @Input() buttonName: string;
  @Input() showSpinner: string;

  @Input() headerTemplate: TemplateRef<any>;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<any>;

  @Output() valueChange = new EventEmitter();

  @ViewChild(ImagesComponent) imagesComponentRef: ImagesComponent;
  @ViewChild(CheckboxComponent) checkboxComponentRef: CheckboxComponent;
  @ViewChild(AdvancedInputComponent) advancedInputComponentRef: AdvancedInputComponent;

  form: FormGroup;

  constructor(private generateForm: GenerateFormStructureService) { }

  ngOnInit() {
    this.controls$.subscribe(x => console.log(x))
    
    this.form = this.generateForm.defineStructure(this.controls$);
  }

  onSubmit() {
    this.valueChange.emit(this.form.value);
    this.resetForm();

  }

  resetForm() {
    this.form = this.generateForm.defineStructure(this.controls$);
    this.imagesComponentRef.cleanControl();
    this.checkboxComponentRef.cleanControl();
    this.advancedInputComponentRef.dropdownComponentRef.cleanControl();
  }

  trackById(index, item) {
    return item.id;
  }
}
