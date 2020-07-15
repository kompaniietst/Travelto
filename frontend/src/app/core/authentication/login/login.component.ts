import { Component, OnInit } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertMessageService } from '../../services/alert-message.service';
import { AuthenticationService } from '../authentication.service';
import { of } from 'rxjs';
import { Control } from '../../models/Control';
import { SizeDetectorService } from '../../services/size-detector.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  formStructure$ = of([
    new Control({
      controlType: 'input',
      key: 'email',
      label: 'Email:',
      placeholder: ''
    }),
    new Control({
      controlType: 'input',
      key: 'password',
      label: 'Password:',
      placeholder: '',
      type: 'password'
    }),
  ])

  constructor(
    private dialog: MatDialog,
    private auth: AuthenticationService,
    private alert: AlertMessageService,
    private breakpoint: SizeDetectorService
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

  onSubmit(formData) {
    console.log(formData);

    this.auth
      .login(formData.email, formData.password)
      .subscribe(
        _ => this.dialog.closeAll(),
        err => this.alert.error(err.error)
      )
  }
}
