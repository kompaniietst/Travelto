import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertMessageService } from '../../services/alert-message.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private auth: AuthenticationService,
    private alert: AlertMessageService
  ) { }

  ngOnInit() { }

  form = new FormGroup({
    firstname: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  openModal() {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, {
      panelClass: 'popup',
    });
  }

  onSubmit() {
    const user = this.form.value;

    this.auth
      .register(user)
      .subscribe(
        _ => {
          this.alert.success('Thanks for the registration');

          setTimeout(() => {
            this.dialog.closeAll();
            const dialogRef = this.dialog.open(LoginComponent, {
              panelClass: 'popup',
            });
          }, 1500);
        },
        err => this.alert.error(err.error)
      )
  }
}
