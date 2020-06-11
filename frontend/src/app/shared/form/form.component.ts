import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenerateFormStructureService } from 'src/app/core/services/generate-form-structure.service';
import { Control } from 'src/app/core/models/Control';
import { Observable } from 'rxjs';

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

  form: FormGroup;

  constructor(private generateForm: GenerateFormStructureService) { }

  ngOnInit() {
    this.form = this.generateForm.defineStructure(this.controls$);
  }

  onSubmit() {
    this.valueChange.emit(this.form.value);
    console.log('in form conmpopent', this.form.value);
  }

  trackById(index, item) {
    return item.id;
  }
}
