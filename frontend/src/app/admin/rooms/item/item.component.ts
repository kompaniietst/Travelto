import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/core/models/Room';
import { AdminService } from '../../admin.service';
import { Hotel } from 'src/app/core/models/Hotel';
import { Amenity } from 'src/app/core/models/Amenity';
// import { HotelService } from 'src/app/core/http/hotel.service';

class HoteInfo {
  _id: string;
  name: string;
  stars: number;
}
@Component({
  selector: 'app-room-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class RoomItemComponent implements OnInit {

  @Input() item: Room;
  hotelInfo: HoteInfo;
  loading = true;
  amenities: Amenity[];

  constructor(
    private admin: AdminService
  ) {
    this.admin.getAmenities()
      .subscribe((x: Amenity[]) => this.amenities = x)
  }

  ngOnInit(): void {
    this.loading = true;

    this.admin.getHotelById(this.item.hotel_id)
      .subscribe((x: Hotel) => {

        this.loading = false;

        this.hotelInfo = {
          _id: x._id,
          name: x.name,
          stars: x.stars
        }
      })
  }

}
