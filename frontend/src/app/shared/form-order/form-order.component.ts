import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Control } from 'src/app/core/models/Control';
import { Room } from 'src/app/core/models/Room';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import * as moment from 'moment';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { RegistrationComponent } from 'src/app/core/authentication/registration/registration.component';
import { LoginComponent } from 'src/app/core/authentication/login/login.component';
import { BookingService } from 'src/app/core/services/booking.service';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.scss']
})
export class FormOrderComponent implements OnInit {

  controls$: Observable<Control[]>;
  room: Room;
  nights: number;
  total: number;
  isAuthorized: boolean = false;
  ii: boolean = false;
  currUser: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthenticationService,
    private dialog: MatDialog,
    private booking: BookingService,
    private alert: AlertMessageService,
    private ls: LocalStorageService) {

    this.auth.currUser
      .subscribe((x: User) => {
        this.currUser = x;
      })

    this.ls.get()
      .subscribe(x => {
        if (x.date)
          this.nights = moment(x.date[1]).diff(moment(x.date[0]), 'days');
      })

  }

  ngOnInit(): void {
    console.log('data ',this.data  );
    
    this.controls$ = this.data.controls;
    this.controls$.subscribe(x=>console.log('(x) ',x))
    
    this.room = this.data.room;

    this.total = this.room.price * this.nights
  }

  onSubmit(formData: any) {
    var order = formData;

    var orderData = {
      price: this.room.price,
      nights: this.nights,
      owner_id: this.room.creator,
      room_id: this.room._id,
      room_name: this.room.name,
      image: this.room.images[0],
      hotel: {
        _id: this.room.hotel._id,
        label: this.room.hotel.name,
        stars: this.room.hotel.stars,
        address: {
          city: {
            _id: this.room.hotel.address.city._id,
            label: this.room.hotel.address.city.name
          },
          street: this.room.hotel.address.street,
          houseNumber: this.room.hotel.address.houseNumber
        }
      },
      clientId: this.currUser._id,
      status: "active"
    }

    this.booking.register(Object.assign(order, orderData))
      .subscribe(
        x => {
          this.alert.success('Order is successfully created')
          setTimeout(() => {
            this.dialog.closeAll();
          }, 1500);
        },
        err => console.log(err)
      )
  }

  openLogInModal() {
    this.dialog.open(LoginComponent, {
      panelClass: 'popup',
    });
  }

  openRegModal() {
    this.dialog.open(RegistrationComponent, {
      panelClass: 'popup',
    });
  }
}
