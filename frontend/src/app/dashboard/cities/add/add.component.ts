import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../admin.service';
import { Control } from 'src/app/core/models/Control';
import { of } from 'rxjs';


@Component({
  selector: 'app-add-cities',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddCitiesComponent implements OnInit {

  showSpinner = false;

  constructor(
    private admin: AdminService,
    private alert: AlertMessageService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }


  formStructure$ = of([

    new Control({
      controlType: 'input',
      key: 'name',
      placeholder: 'City name:',
    })
  ])


  onSubmit(formData) {
    this.showSpinner = true;
    this.admin.registerCity(formData)
      .subscribe(
        _ => {
          this.showSpinner = false;
          this.alert.success('Item is successfuly added.');
        }
      ),
      error => console.log(error)
  }

  ngOnInit(): void { }

}
