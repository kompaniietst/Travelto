import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Control } from 'src/app/core/models/Control';
import { AlertMessageComponent } from 'src/app/shared/alert-message/alert-message.component';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/core/authentication/login/login.component';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss']
})
export class AddYourHotelComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private alert: AlertMessageService,
    private dialog: MatDialog,
    private router: Router) {

    this.auth.currUser.subscribe(x => {                                        // check if user is a member
      if (x.role == "member" || x.role == "admin") this.router.navigate(['/admin/hotels'])
    })
  }

  formStructure$: Observable<Control[]> = of([
    new Control({
      controlType: 'input',
      key: 'firstname',
      label: 'Name:',
      placeholder: 'Enter your name:',
    }),
    new Control({
      controlType: 'input',
      key: 'phone',
      label: 'Phone:',
      placeholder: 'Enter your phone:',
    }),
    new Control({
      controlType: 'input',
      key: 'email',
      label: 'Email:',
      placeholder: 'Enter your email:',
      type: "email"
    }),
    new Control({
      controlType: 'input',
      key: 'password',
      label: 'Password:',
      placeholder: 'Enter your password:',
      type: "password"
    }),
  ])

  ngOnInit(): void {
  }

  onSubmit(formData: any) {
    console.log(formData);
    var newMember = formData;
    newMember["role"] = "member";

    this.auth.register(newMember)
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

  openModal(){
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, {
      panelClass: 'popup',
    });
  }

}
