import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../admin.service';
import { Observable, of } from 'rxjs';
import { Amenity } from 'src/app/core/models/Amenity';
import { Control } from 'src/app/core/models/Control';

@Component({
  selector: 'app-view-amenities',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewAmenitiesComponent implements OnInit {

  amenities$: Observable<Amenity[]>;

  constructor(
    private admin: AdminService,
  ) {

    this.amenities$ = this.admin.getAmenities();
  }

  ngOnInit(): void { }
  
  trackById(index, item) {
    return item.id;
  }
}
