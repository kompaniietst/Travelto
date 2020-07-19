import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertMessageService } from '../../services/alert-message.service';
import { AuthenticationService } from '../authentication.service';
import { of } from 'rxjs';
import { Control } from '../../models/Control';

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

  formStructure$ = of([
    new Control({
      controlType: 'input',
      key: 'firstname',
      label: 'Firstname:',
      placeholder: '',
    }),
    new Control({
      controlType: 'input',
      key: 'phone',
      label: 'Phone:',
      placeholder: '',
    }),
    new Control({
      controlType: 'input',
      key: 'email',
      label: 'Email:',
      placeholder: '',
      required: true
    }),
    new Control({
      controlType: 'input',
      key: 'password',
      label: 'Password:',
      placeholder: '',
      type: 'password',
      required: true
    }),
  ])
  
  ngOnInit() { }

  openModal() {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, {
      panelClass: 'popup',
    });
  }

  onSubmit(formData) {
    console.log(formData);
    const newUser = formData;
    newUser["role"] = "user";
    console.log('newusr', newUser);

    this.auth
      .register(newUser)
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
        // err => this.alert.error(err.error)
      )
  }
}
