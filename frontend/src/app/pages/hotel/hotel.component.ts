import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminService } from 'src/app/admin/admin.service';
import { Hotel } from 'src/app/core/models/Hotel';
import { Room } from 'src/app/core/models/Room';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { Amenity } from 'src/app/core/models/Amenity';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  id: string = this.route.snapshot.params.id;
  hotel: Hotel;
  loading = true;
  // breadcrumbs: string[] = ['All hotels', 'Hotel preview'];
  // hotelAmenities;

  rooms$: Observable<Room[]>;
  amenities: Amenity[];
  // mapLat;
  // mapLng;
  // markers = [];

  // loading = true;

  needCountSlides: boolean = true;
  
  carouselConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true
  };
  
  constructor(
    private route: ActivatedRoute,
    private admin: AdminService,
    private alert: AlertMessageService
  ) {
    console.log(this.id);

    this.admin
      .getHotelBy(this.id)
      .subscribe(
        (h: Hotel) => {
          this.hotel = h
          console.log('HOTEl', this.hotel);
          this.loading = false
        },
        err => this.alert.error(err.error))

    this.admin.getAmenities()
      .subscribe((x: Amenity[]) => this.amenities = x)
  }


  ngOnInit(): void {

    this.rooms$ = this.admin.getRoomsByHotel(this.id)

    this.admin.getRoomsByHotel(this.id)
      .subscribe(
        r => console.log('after r', r),
        er => console.log(er))
  }

  ifActiveAmenity(_id: string) {
    return this.hotel.amenities.some(a => a._id == _id)
  }

  trackById(index, item) {
    return item.id;
  }
}
