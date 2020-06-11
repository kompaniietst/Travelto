import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Amenity } from 'src/app/core/models/Amenity';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class HotelItemComponent implements OnInit {

  @Input() item;

  hotelAmenities: Amenity[];
  allAmenities: Amenity[];

  constructor(
    private route: ActivatedRoute,
    private admin: AdminService
  ) {
    this.admin.getAmenities()
      .subscribe((x: Amenity[]) => this.initAllAmenities(x))
  }

  ngOnInit(): void { }

  initAllAmenities(allAmenities) {
    this.hotelAmenities = allAmenities
      .filter((a: Amenity) => this.item.amenities
        .some((x: Amenity) => x == a._id));
  }
}
