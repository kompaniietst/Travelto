import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Control } from '../models/Control';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerateFormStructureService {

  defineStructure(controls$: Observable<Control[]>) {

    let group = {};
 
    controls$.subscribe(x => {


      x.forEach((control: Control) => {

        switch (control.controlType) {

          case 'input': group[control.key] = control.required
            ? new FormControl(control.value || '', Validators.required)
            : new FormControl(control.value || '');
            break;

          case 'radio': group[control.key] = this.defineRadioValue(control.options);
            break;

          default:
            group[control.key] = control.required
              ? new FormControl({ value: this.defineValue(control), disabled: control.disabled } || '', Validators.required)
              : new FormControl({ value: this.defineValue(control), disabled: control.disabled } || '');

            break;
        }
      })

    })
    
    return new FormGroup(group);

  }

  defineRadioValue(options) {
    var i = options.findIndex(x => x.checked)
    return new FormControl(i)
  }

  defineValue(control) {
    return control.options ? [] : null
  }
}
