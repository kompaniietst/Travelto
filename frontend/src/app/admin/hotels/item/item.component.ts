import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Amenity } from 'src/app/core/models/Amenity';
import { Hotel } from 'src/app/core/models/Hotel';
import { of, Observable, forkJoin } from 'rxjs';
import { Control } from 'src/app/core/models/Control';
import { City } from 'src/app/core/models/City';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class HotelItemComponent<T> implements OnInit {

  @Input() item: Hotel;

  formStructure$: Observable<Control[]>;
  showSpinner = false;
  editItem: boolean = false;

  constructor(
    private admin: AdminService,
    private alert: AlertMessageService
  ) {
    forkJoin(
      this.admin.getAmenities(),       // get cities and amenities from the server to form form structure
      this.admin.getCities()
    ).subscribe(x => this.initFormStructure(x[0] as Amenity[], x[1] as City[]))
  }

  ngOnInit(): void { }

  edit(_id: string) {
    this.editItem = true;
  }

  initFormStructure(amenities: Amenity[], cities: City[]) {

    this.formStructure$ = of([

      new Control({
        controlType: 'input',
        key: 'name',
        value: this.item.name,
        placeholder: 'Name:',
        required: true
      }),


      new Control({
        controlType: 'input',
        key: 'stars',
        type: 'number',
        value: this.item.stars,
        placeholder: 'Stars amount:',
        required: true
      }),

      new Control({
        controlType: 'input',
        key: 'description',
        type: 'textarea',
        value: this.item.description,
        placeholder: 'Description:',
        required: true
      }),

      new Control({
        controlType: 'address',
        key: 'address',
        options: [
          new Control({
            controlType: 'dropdown',
            key: 'city',
            value: this.item.address.city,
            placeholder: 'City:',
            options: cities,
            required: true
          }),
          new Control({
            controlType: 'input',
            key: 'street',
            value: this.item.address.street,
            placeholder: 'Street:',
            required: true
          }),
          new Control({
            controlType: 'input',
            key: 'houseNumber',
            value: this.item.address.houseNumber,
            placeholder: '№:',
            required: true
          }),
          new Control({
            controlType: 'input',
            key: 'disctrict',
            value: this.item.address.disctrict,
            placeholder: 'Disctrict:',
            required: true
          }),
          new Control({
            controlType: 'input',
            key: 'map',
            label: 'Map coordinates:',
            required: true,
            value: this.item.address.map,
            options: [
              { placeholder: 'latitude' },
              { placeholder: 'longitude' }
            ]
          }),
        ]
      }),

      new Control({
        controlType: 'images',
        key: 'images',
        type: 'hotels',
        value: this.item.images,
      }),

      new Control({
        controlType: 'checkbox',
        key: 'amenities',
        label: 'Choose amenities:',
        value: this.item.amenities,
        options: amenities,
      }),

    ])
  }

  cancelEdit() {
    this.editItem = false;
  }

  onSubmit(formData: any) {
    this.showSpinner = true;
    console.log('on edit', formData);
    this.admin.editHotel(this.item._id, formData)
      .subscribe(
        x => {
          console.log('sss', x);

          this.alert.success("Item is successfuly updated");

          this.showSpinner = false;
          setTimeout(() => { this.editItem = false }, 1500);
        },
        err => console.log(err)
      )
  }
}
