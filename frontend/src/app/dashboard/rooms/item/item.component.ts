import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from 'src/app/core/models/Room';
import { AdminService } from '../../admin.service';
import { Hotel } from 'src/app/core/models/Hotel';
import { Amenity } from 'src/app/core/models/Amenity';
import { Observable, of } from 'rxjs';
import { Control } from 'src/app/core/models/Control';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { CustomCurrencyPipe } from 'src/app/pipes/customCurrency.pipe';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { HotelService } from 'src/app/core/services/hotel.service';
import { User } from 'src/app/core/models/User';
import { RoomService } from 'src/app/core/services/room.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [CustomCurrencyPipe]
})
export class RoomItemComponent implements OnInit {

  readonly URL = environment.apiUrl;

  @Input() item: Room;
  // hotelInfo: HoteInfo;
  loading = true;
  amenities: Amenity[];
  currUser: User;

  formStructure$: Observable<Control[]>;
  showSpinner = false;
  editItem: boolean = false;
  defaultFormData: Partial<Room>;

  @Output() editRoom: EventEmitter<string> = new EventEmitter();
  @Output() removeRoom: EventEmitter<string> = new EventEmitter();

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
    private alert: AlertMessageService,
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.auth.currUser
      .subscribe(user => {
        if (user) {
          this.currUser = user;
          this.getHotels(user.role, user._id);
        }
      })
  }

  getHotels(role: string, _id: string) {
    this.hotelService.getHotelsByCurrRole(role, _id)                 // get hotels for editing curr room
      .subscribe((x: Hotel[]) => {
        var hotels = x.map(({ _id, name }) => { return { _id, name } })

        this.initFormStructure(hotels)
      }, err => err)
  }

  edit(_id: string) {
    this.editItem = true;
    this.router.navigate([`edit/${_id}`], { relativeTo: this.route });
  }

  initFormStructure(hotels: { _id: string, name: string }[]) { // define form structure for editing curr room

    this.formStructure$ = of([
      new Control({
        controlType: 'dropdown',
        key: 'hotel_id',
        label: 'Select hotel name',
        value: hotels.find(h => h._id == this.item.hotel._id),
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
          { _id: "2", label: "Recommend" },
          { _id: "3", label: "Best price" }
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
    this.router.navigate(["."], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.loading = true;

    const currUserId = this.auth.getCurrUser()._id;

    this.defaultFormData = {
      name: this.item.name,
      description: this.item.description,
      price: this.item.price,
      specials: this.item.specials,
      textFeatures: this.item.textFeatures,
      images: this.item.images,
    }
  }

  remove(_id: string) {
    this.removeRoom.emit(_id);
  }

  onSubmitEditForm(formData: any) {
    this.roomService.editRoom(this.item._id, formData)
      .subscribe(
        (x: Room) => {
          this.editRoom.emit(x._id);
          this.editItem = false;
        },
        err => console.log(err)
      )
  }

  trackById(index, item) {
    return item.id;
  }
}