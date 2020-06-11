import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Control } from 'src/app/core/models/Control';
import { DropdownComponent } from './dropdown/dropdown.component';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  providers: [DropdownComponent]
})
export class FormControlComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() control: Control;

  constructor() { }

  ngOnInit() { }

}
