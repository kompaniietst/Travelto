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

  readonly URL = environment.apiUrl;

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






  mapApiKey = environment.mapApiKey;

  markers = [];
  mapLat: number;
  mapLng: number;

  needCountSlides: boolean = true;
  carouselConfig;
  carouselConfigRooms;


  constructor(
    private route: ActivatedRoute,
    private admin: AdminService,
    private alert: AlertMessageService
  ) {
    console.log(this.id);

    // this.admin
    //   .getHotelBy(this.id)
    //   .subscribe(
    //     (h: Hotel) => {
    //       this.hotel = h
    //       console.log('HOTEl', this.hotel);
    //       this.loading = false;
    //       this.getRooms();
    //       this.defineMapData();
    //       this.defineCarousels();
    //     },
    //     err => this.alert.error(err.error))

    this.admin.getAmenities()
      .subscribe((x: Amenity[]) => this.amenities = x)
  }

  ngOnInit(): void {
    console.log('this.route', this.route);

  }

  getRooms() {
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

  defineCarousels() {
    this.carouselConfig = {
      slidesToShow: this.hotel.images.length < 3 ? this.hotel.images.length : 3,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true
    };
    this.carouselConfigRooms = {
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
      needLink: true,
      arrows: true,
      autoplay: true,
      draggable: true,
    };
  }
  trackById(index, item) {
    return item.id;
  }
}
