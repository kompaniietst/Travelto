import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Amenity } from 'src/app/core/models/Amenity';
import { Hotel } from 'src/app/core/models/Hotel';
import { FormComponent } from 'src/app/shared/form/form.component';
import { TestComponent } from 'src/app/test/test.component';
import { ConvertToFormStructureService } from 'src/app/core/services/convert-to-form-structure.service';
import { of, forkJoin } from 'rxjs';
import { Control } from 'src/app/core/models/Control';
import { City } from 'src/app/core/models/City';
import { log } from 'util';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class HotelItemComponent<T> implements OnInit {

  @Input() item: Hotel;

  hotelAmenities: Amenity[];
  allAmenities: Amenity[];

  formStructure$

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private admin: AdminService,
    private resolver: ComponentFactoryResolver,
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

  editHotel: boolean = false;
  controls$

  edit(_id: string, hotel: Hotel) {

    this.editHotel = true;

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
    this.editHotel = false;
  }

  onSubmit(formData: any) {
    console.log('on edit', formData);
    this.admin.editHotel(this.item._id, formData)
      .subscribe(
        x => this.editHotel = false,
        err => console.log(err)
      )
  }
}
