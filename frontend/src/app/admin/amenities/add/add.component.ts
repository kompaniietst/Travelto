import { Component, OnInit } from '@angular/core';
import { Input } from 'src/app/shared/models/form/Input';
import { Radio } from 'src/app/shared/models/form/Radio';
import { error } from '@angular/compiler/src/util';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { ActivatedRoute } from '@angular/router';
import { ImageInput } from 'src/app/shared/models/form/ImageInput';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../admin.service';


@Component({
  selector: 'app-add-amenities',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddAmenitiesComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private alert: AlertMessageService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }


  formStructure = [

    new Input({
      key: 'label',
      placeholder: 'Label:',
    }),

    new Radio({
      key: 'checked',
      placeholder: 'Checked:',
      options: [
        { id: 0, label: 'Not checked', checked: true },
        { id: 1, label: 'Checked', checked: false },
      ]
    }),

    new ImageInput({
      controlType: 'images',
      key: 'images',
      options: []
    }),
  ]

  onValueChanged(data) {
    this.adminService.registerAmenity(data)
      .subscribe(
        x => {
          console.log('amenity_ ', x);
          this.alert.success('Item is successfuly added.');
        }
      ),
      error => console.log(error)
  }

  ngOnInit(): void { }


}
