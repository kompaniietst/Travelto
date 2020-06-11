import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../admin.service';
import { Observable } from 'rxjs';
import { Amenity } from 'src/app/core/models/Amenity';

@Component({
  selector: 'app-view-amenities',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewAmenitiesComponent implements OnInit {

  amenities$: Observable<Amenity[]>;

  constructor(
    private admin: AdminService,
    private alert: AlertMessageService,
    private http: HttpClient
  ) {

    this.amenities$ = this.admin.getAmenities();
  }

  ngOnInit(): void { }

}
