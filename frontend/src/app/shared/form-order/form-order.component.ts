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

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.scss']
})
export class FormOrderComponent implements OnInit {

  controls$: Observable<Control[]>;
  room: Room;
  nightAmount: number;
  total: number;
  isAuthorized: boolean = false;
  ii: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthenticationService,
    private dialog: MatDialog,
    private ls: LocalStorageService) {
    this.ls.get()
      .subscribe(x => {
        if (x.date)
          this.nightAmount = moment(x.date[1]).diff(moment(x.date[0]), 'days');
      })

    this.isAuthorized = this.auth.isAuthorized();
  }

  ngOnInit(): void {
    this.controls$ = this.data.controls;
    this.room = this.data.room;

    this.total = this.room.price * this.nightAmount
  }

  onSubmit(formData: any) {
    console.log('formOrder', formData);
  }

  openLogInModal() {
    // this.dialog.closeAll();
    this.dialog.open(LoginComponent, {
      panelClass: 'popup',
    });
  }

  openRegModal() {
  //  this.dialog.closeAll();
    this.dialog.open(RegistrationComponent, {
      panelClass: 'popup',
    });
  }
}
