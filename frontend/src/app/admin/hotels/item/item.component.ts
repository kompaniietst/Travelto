import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Amenity } from 'src/app/core/models/Amenity';
import { Hotel } from 'src/app/core/models/Hotel';
import { FormComponent } from 'src/app/shared/form/form.component';
import { TestComponent } from 'src/app/test/test.component';
import { ConvertToFormStructureService } from 'src/app/core/services/convert-to-form-structure.service';
import { of, forkJoin, Observable } from 'rxjs';
import { Control } from 'src/app/core/models/Control';
import { City } from 'src/app/core/models/City';
import { log } from 'util';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class HotelItemComponent<T> implements OnInit {

  @Input() item: Hotel;

  hotelAmenities: Amenity[];
  allAmenities: Amenity[];

  formStructure$: Observable<Control[]>;
  showSpinner = false;
  editItem: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private admin: AdminService,
    private alert: AlertMessageService,
    private converToForm: ConvertToFormStructureService<T>
  ) {
    this.admin.getAmenities()
      .subscribe((x: Amenity[]) => this.initAllAmenities(x));


    forkJoin(
      this.admin.getAmenities(),
      this.admin.getCities()
    )
      .subscribe(x => {
        if (this.item) this.initFormStructure(x[0], x[1])
      })
  }

  ngOnInit(): void {
    // console.log('item', this.item);
  }

  initAllAmenities(allAmenities) {
    this.hotelAmenities = allAmenities
      .filter((a: Amenity) => this.item.amenities
        .some((x: Amenity) => x == a._id));
  }



  edit(_id: string, hotel: Hotel) {
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
        options: []
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

  rem(_id: string) {

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
          setTimeout(() => {
            this.editItem = false
          }, 1500);
        },
        err => console.log(err)
      )
  }
}
