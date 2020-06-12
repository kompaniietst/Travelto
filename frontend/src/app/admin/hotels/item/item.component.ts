import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Amenity } from 'src/app/core/models/Amenity';
import { Hotel } from 'src/app/core/models/Hotel';

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

  edit(_id: string, hotel: Hotel) {

    console.log('EDIT', hotel);


    // this.admin.editHotel(_id, hotel)
    //   .subscribe((x: Hotel) => console.log('edited h',x))
  }

  rem(_id: string) {

  }
}
