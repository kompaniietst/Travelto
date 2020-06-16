import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/core/models/Room';
import { AdminService } from '../../admin.service';
import { Hotel } from 'src/app/core/models/Hotel';
import { Amenity } from 'src/app/core/models/Amenity';
import { Observable, of } from 'rxjs';
import { Control } from 'src/app/core/models/Control';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';

class HoteInfo {
  _id: string;
  name: string;
  stars: number;
}

@Component({
  selector: 'app-room-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class RoomItemComponent implements OnInit {

  @Input() item: Room;
  hotelInfo: HoteInfo;
  loading = true;
  amenities: Amenity[];

  formStructure$: Observable<Control[]>;
  showSpinner = false;
  editItem: boolean = false;

  constructor(
    private admin: AdminService,
    private alert: AlertMessageService
  ) {

    this.admin.getHotels()                  // get hotels for editing curr room
      .subscribe(x => {
        var hotels = x.map(h => { return { _id: h._id, label: h.name } })
        this.initFormStructure(hotels)
      })
  }

  edit(_id: string) {
    this.editItem = true;
  }

  initFormStructure(hotels: { _id: string, label: string }[]) { // define form structure for editing curr room

    this.formStructure$ = of([
      new Control({
        controlType: 'dropdown',
        key: 'hotel_id',
        label: 'Select hotel name',
        value: hotels.find(h => h._id == this.item.hotel_id),
        options: hotels,
        required: true
      }),

      new Control({
        controlType: 'input',
        key: 'name',
        placeholder: 'Name:',
        required: true
      }),
      new Control({
        controlType: 'input',
        type: 'textarea',
        key: 'description',
        placeholder: 'Description:',
        required: true
      }),
      new Control({
        controlType: 'input',
        key: 'price',
        label: 'Price',
        type: 'number',
        placeholder: '$ Price: (per night)',
        required: true
      }),

      new Control({
        controlType: 'checkbox',
        key: 'specials',
        label: 'Choose specials:',
        value: this.item.specials,
        options: [
          { _id: "1", label: "25%" },
          { _id: "2", label: "Рекомендуем" },
          { _id: "3", label: "Лучшая цена" }
        ],
      }),

      new Control({
        controlType: 'textFeatures',
        key: 'textFeatures',
        label: 'Room features:',
        value: this.item.textFeatures,
        placeholder: 'Field:',
      }),

      new Control({
        controlType: 'images',
        key: 'images',
        type: 'rooms',
        value: this.item.images,
        options: []
      }),

    ])
  }

  cancelEdit() {
    this.editItem = false;
  }

  ngOnInit(): void {
    this.loading = true;

    this.admin.getHotelBy(this.item.hotel_id)
      .subscribe((x: Hotel) => {
        this.loading = false;
        this.hotelInfo = { _id: x._id, name: x.name, stars: x.stars } as HoteInfo;
      })
  }

  onSubmit(formData: any) {
    this.showSpinner = true;
    console.log('on edit', formData);
    this.admin.editRoom(this.item._id, formData)
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
