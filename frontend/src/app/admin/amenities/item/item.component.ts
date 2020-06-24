import { Component, OnInit, Input } from '@angular/core';
import { Amenity } from 'src/app/core/models/Amenity';
import { Control } from 'src/app/core/models/Control';
import { Observable, of } from 'rxjs';
import { AdminService } from '../../admin.service';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';

@Component({
  selector: 'app-amenity-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class AmenityItemComponent implements OnInit {

  @Input() item: Amenity;

  formStructure$: Observable<Control[]>;
  showSpinner = false;
  editItem: boolean = false;

  constructor(private admin: AdminService,
    private alert: AlertMessageService
  ) { }

  ngOnInit(): void { }


  edit(_id: string) {
    this.formStructure$ = of([

      new Control({
        controlType: 'input',
        key: 'label',
        value: this.item.label,
        placeholder: 'Label:',
      }),

      new Control({
        controlType: 'radio',
        key: 'checked',
        value: this.item.checked,
        placeholder: 'Checked:',
        options: [
          { id: 0, label: 'Not checked', checked: true },
          { id: 1, label: 'Checked', checked: false },
        ]
      }),

      new Control({
        controlType: 'images',
        key: 'image',
        type: "amenities",
        value: this.item.image,
        options: []
      }),
    ]);
    this.editItem = true;
  }


  rem(_id: string) {

  }

  cancelEdit() {
    this.editItem = false;
  }

  onSubmit(formData: any) {
    this.showSpinner = true;
    // console.log('on edit', formData);
    this.admin.editAmenity(this.item._id, formData)
      .subscribe(
        x => {
          console.log('sss', x);
          this.alert.success("Item is successfuly updated");
          this.showSpinner = false;
          setTimeout(() => {
            this.editItem = false
          }, 1500);
        },
        err => console.log(err)
      )
  }

}
