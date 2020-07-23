import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Amenity } from 'src/app/core/models/Amenity';
import { Hotel } from 'src/app/core/models/Hotel';
import { of, Observable, forkJoin } from 'rxjs';
import { Control } from 'src/app/core/models/Control';
import { City } from 'src/app/core/models/City';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class HotelItemComponent<T> implements OnInit {

  @Input() item: Hotel;

  readonly URL = environment.apiUrl;

  formStructure$: Observable<Control[]>;
  showSpinner = false;
  editItem: boolean = false;

  @Output() editHotel: EventEmitter<{ _id: string, formData: Hotel }> = new EventEmitter();
  @Output() removeHotel: EventEmitter<string> = new EventEmitter();

  constructor(
    private admin: AdminService,
    private alert: AlertMessageService
  ) {

    forkJoin(
      this.admin.getAmenities(),       // get cities and amenities from the server to form form structure
      this.admin.getCities()
    )
      .subscribe(x => this.initFormStructure(x[0] as Amenity[], x[1] as City[]))
  }

  ngOnInit(): void { }

  edit(_id: string) {
    this.editItem = true;
  }

  remove(_id: string) {
    this.removeHotel.emit(_id);
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
            type: 'number',
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
            type: 'number',
            required: true,
            value: this.item.address.map || [0, 0],
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

  onSubmitEditForm(formData: Hotel) {
    this.editHotel.emit({ _id: this.item._id, formData: formData });
    this.editItem = false;
  }

  trackById(index, item) {
    return item.id;
  }
}
