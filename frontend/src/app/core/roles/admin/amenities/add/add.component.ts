import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { AdminService } from '../../admin.service';
import { Control } from 'src/app/core/models/Control';
import { of } from 'rxjs';


@Component({
  selector: 'app-add-amenities',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddAmenitiesComponent implements OnInit {

  showSpinner = false;

  constructor(
    private admin: AdminService,
    private alert: AlertMessageService,
  ) { }


  formStructure$ = of([

    new Control({
      controlType: 'input',
      key: 'label',
      placeholder: 'Label:',
    }),

    new Control({
      controlType: 'radio',
      key: 'checked',
      placeholder: 'Checked:',
      options: [
        { id: 0, label: 'Not checked', checked: true },
        { id: 1, label: 'Checked', checked: false },
      ]
    }),

    new Control({
      controlType: 'images',
      key: 'images',
      type: "amenities",
      options: []
    }),
  ])

  onSubmit(formData) {
    this.showSpinner = true;
    this.admin.registerAmenity(formData)
      .subscribe(
        _ => {
          this.showSpinner = false;
          this.alert.success('Item is successfuly added.');
        }
      ),
      err => this.alert.error(err.error)
  }

  ngOnInit(): void { }


}
