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

    // this.rooms$ = this.admin
    //   .getRoomsByHotel(this.id);

    // this.admin
    //   .getRoomsByHotel(this.id)
    //   .subscribe(
    //     resp => {
    //       console.log('room', resp);
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   )
  }

  needCountSlides: boolean = true;
  carouselConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };

  carouselConfigRooms = {
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    needLink: true,
    arrows: true,
    autoplay: true,
    draggable: true,
  };

  ngOnInit(): void {

    this.rooms$ = this.admin
      .getRoomsByHotel(this.id)

    this.admin.getRoomsByHotel(this.id)
      .subscribe(h => console.log(h),
        er => console.log(er))
  }

  ifActiveAmenity(_id: string) {
    return this.hotel.amenities.some(a => a._id == _id)
  }

  trackById(index, item) {
    return item.id;
  }
}
