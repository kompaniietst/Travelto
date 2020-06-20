import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminService } from 'src/app/admin/admin.service';
import { Hotel } from 'src/app/core/models/Hotel';
import { Room } from 'src/app/core/models/Room';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { Amenity } from 'src/app/core/models/Amenity';
import { CustomCurrencyPipe } from 'src/app/pipes/customCurrency.pipe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
  providers: [CustomCurrencyPipe]
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

  mapApiKey = environment.mapApiKey;

  markers = [];
  mapLat: number;
  mapLng: number;


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
          this.loading = false;
          this.defineMapData();
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

  defineMapData() {
    this.markers = [
      { lat: +this.hotel.address.map[0], lng: +this.hotel.address.map[1] },
    ];
    this.mapLat = +this.hotel.address.map[0];
    this.mapLng = +this.hotel.address.map[1];
  }

  trackById(index, item) {
    return item.id;
  }
}
