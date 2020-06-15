import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { Control } from 'src/app/core/models/Control';
import { Observable, of, forkJoin } from 'rxjs';
import { Amenity } from 'src/app/core/models/Amenity';
import { Hotel } from 'src/app/core/models/Hotel';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { Room } from 'src/app/core/models/Room';

@Component({
  selector: 'app-add-room',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddRoomComponent implements OnInit {

  amenities: Amenity[];
  hotels: Hotel[];
  showSpinner = false;

  constructor(
    private admin: AdminService,
    private alert: AlertMessageService
  ) {

    forkJoin(
      this.admin.getAmenities(),
      this.admin.getHotels()
    )
      .subscribe(x => {
        var amenities = x[0];

        var hotels = x[1]
          .map(h => { return { _id: h._id, label: h.name } })

        this.initFormStructure(amenities, hotels)
      })
  }

  formStructure$: Observable<Control[]>;

  ngOnInit(): void { }

  initFormStructure(amenities: Amenity[], hotels: { _id: string, label: string }[]) {
    
    this.formStructure$ = of([
      new Control({
        controlType: 'dropdown',
        key: 'hotel_id',
        label: 'Select hotel name',
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
        type: 'number',
        placeholder: '$ Price: (per night)',
        required: true
      }),

      new Control({
        controlType: 'checkbox',
        key: 'specials',
        label: 'Choose specials:',
        options: [
          { _id: "1", label: "25%" },
          { _id: "2", label: "Рекомендуем" },
          { _id: "3", label: "Лучшая цена" }
        ],
      }),

      new Control({
        controlType: 'images',
        key: 'images',
        type: 'rooms',
        options: []
      }),

      new Control({
        controlType: 'checkbox',
        key: 'amenities',
        label: 'Choose amenities:',
        options: amenities,
      }),

    ])
  }

  onSubmit(room: Room) {
    this.showSpinner = true;
    // this.admin.registerRoom(room)
    //   .subscribe(
    //     (_: Room) => {
    //       this.showSpinner = false;
    //       console.log('respRoom', _);
    //       //this.router.navigate([`/room/${_._id}`])
    //       this.alert.success('Item is successfully added');
    //     },
    //     err => this.alert.error(err.error)
    //   )

  }

}