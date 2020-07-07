import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Control } from 'src/app/core/models/Control';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { environment } from 'src/environments/environment';
import { of, Observable, forkJoin, combineLatest } from 'rxjs';
import { CitiesService } from 'src/app/core/services/cities.service';
import { City } from 'src/app/core/models/City';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  currUser: User;
  formStructureControls$: Observable<Control[]>;
  profileImage: string;
  readonly URL = environment.apiUrl;

  constructor(
    private auth: AuthenticationService,
    private alert: AlertMessageService,
    private citiesService: CitiesService
  ) {
 

    combineLatest(
      this.auth.currUser,
      this.citiesService.get()
    )
      .subscribe(x => {
        this.currUser = x[0];
        console.log('p ',this.URL + this.currUser.image);
        
        this.profileImage = this.URL + this.currUser.image;

        var cities = x[1];

        this.defineFormStructure(cities as City[]);
        console.log('***', this.currUser);
      }) /* */

      // this.auth.getUser().complete();
    // this.auth.currUser.subscribe((user: User) => {
    //   this.currUser = user;
    //   console.log('user', user);
    // });

    console.log('URL', this.URL);

    // this.selectedFile = this.currUser.image;
  }

  //   personaleFormStructureControls: Form[];
  //   passwordFormStructureControls: Form[];

  ngOnInit(): void {

    // this.profileImage = this.URL + this.currUser.image;
    // console.log('im', this.profileImage);

  }

  defineFormStructure(cities: City[]) {

    this.formStructureControls$ = of([

      new Control({
        controlType: 'input',
        key: 'email',
        label: 'Email:',
        placeholder: 'Email:',
        type: 'tel',
        required: true,
        disabled: true,
        value: this.currUser.email || ''
      }),

      new Control({
        controlType: 'input',
        key: 'firstname',
        label: 'Firstname:',
        placeholder: 'Your firstname:',
        type: 'text',
        required: true,
        value: this.currUser.firstname || ''
      }),

      new Control({
        controlType: 'input',
        key: 'lastname',
        label: 'Lastname:',
        placeholder: 'Your lastname:',
        type: 'text',
        required: true,
        value: this.currUser.lastname || ''
      }),

      new Control({
        controlType: 'input',
        key: 'phone',
        label: 'Phone:',
        placeholder: '+7( _ _ _ )_ _ _ - _ _ - _ _',
        type: 'tel',
        required: true,
        value: this.currUser.phone || ''
      }),

      new Control({
        controlType: 'dropdown',
        key: 'city',
        label: 'City:',
        placeholder: 'City:',
        type: 'text',
        value: this.currUser.city || '',
        options: cities
      }),
    ]);
  }

  //   selectedFiles = [];
  formData: FormData = new FormData();
  upload(event: any) {
    console.log('event.target', event.target.files[0]);

    var file = event.target.files[0];

    this.formData.append('file', file);


    console.log('====selectedFiles===', file);

    console.log('id', this.currUser._id);

    this.auth.uploadProfileImage(this.currUser._id, this.formData)
      .subscribe(
        resp => {
          this.alert.success('Changes are saved');
        },
        err => this.alert.error(err.error))
  }

  onSubmit(user: User) {
    this.auth.update(this.currUser._id, user)
      .subscribe(
        _ => this.alert.success('Your data is saved'),
        error => this.alert.success(error))
  }

}
