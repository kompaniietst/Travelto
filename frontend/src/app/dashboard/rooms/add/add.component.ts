import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Control } from 'src/app/core/models/Control';
import { Observable, of, forkJoin } from 'rxjs';
import { Amenity } from 'src/app/core/models/Amenity';
import { Hotel } from 'src/app/core/models/Hotel';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { Room } from 'src/app/core/models/Room';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { AdminService } from '../../admin.service';
import { User } from 'src/app/core/models/User';
import { HotelService } from 'src/app/core/services/hotel.service';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddRoomComponent implements OnInit {

  amenities: Amenity[];
  hotels: Hotel[];
  showSpinner = false;
  currUser: User;
  formStructure$: Observable<Control[]>;

  @Output() addRoom = new EventEmitter<Room>();

  constructor(
    private alert: AlertMessageService,
    private auth: AuthenticationService,
    private hotelService: HotelService,
    private roomService: RoomService,
  ) {

    this.auth.currUser
      .subscribe(user => {
        if (user) {
          this.currUser = user;
          this.getHotels(user._id);
        }
      })
  }

  getHotels(user_id: string) {
    this.hotelService.getHotelsBy(user_id)
      .subscribe(x => {
        var hotels = x.map(h => { return { _id: h._id, label: h.name } })
        this.initFormStructure(hotels)
      })

  }


  ngOnInit(): void { }

  initFormStructure(hotels: { _id: string, label: string }[]) {

    this.formStructure$ = of([
      new Control({
        controlType: 'dropdown',
        key: 'hotel_id',
        label: 'Select hotel name',
        placeholder: 'Choose hotel',
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
        controlType: 'textFeatures',
        key: 'textFeatures',
        label: 'Add features to this room:',
        placeholder: 'Field:',
      }),

      new Control({
        controlType: 'images',
        key: 'images',
        type: 'rooms',
        options: []
      }),

      new Control({
        controlType: 'checkbox',
        key: 'specials',
        label: 'Choose specials:',
        options: [
          { _id: "1", label: "25%" },
          { _id: "2", label: "Recommend" },
          { _id: "3", label: "Best price" }
        ],
      }),
    ])
  }

  onSubmit(formData: Room) {
    this.showSpinner = true;
    this.roomService.register(formData, this.currUser._id)
      .subscribe(
        (resp: Room) => {
          this.showSpinner = false;
          console.log('respRoom', resp);
          //this.router.navigate([`/room/${_._id}`])
          this.alert.success('Item is successfully added');
          this.addRoom.emit(resp);
        },
        err => this.alert.error(err.error)
      )

  }

}