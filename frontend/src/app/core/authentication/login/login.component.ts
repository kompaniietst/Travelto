import { Component, OnInit } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertMessageService } from '../../services/alert-message.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private dialog: MatDialog,
    private auth: AuthenticationService,
    private alert: AlertMessageService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    })
  }

  openRegModal() {
    this.dialog.closeAll();
    this.dialog.open(RegistrationComponent, {
      panelClass: 'popup',
    });
  }

  onSubmit() {
    this.auth
      .login(this.form.value.email, this.form.value.password)
      .subscribe(
        _ => this.dialog.closeAll(),
        err => this.alert.error(err.error)
      )
  }
}
