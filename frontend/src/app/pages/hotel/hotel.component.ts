import { Component, OnInit } from '@angular/core';
import { CustomCurrencyPipe } from 'src/app/pipes/customCurrency.pipe';
import { ActivatedRoute } from '@angular/router';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { environment } from 'src/environments/environment';
import { Hotel } from 'src/app/core/models/Hotel';
import { Room } from 'src/app/core/models/Room';
import { Observable } from 'rxjs';
import { HotelService } from 'src/app/core/services/hotel.service';
import { RoomService } from 'src/app/core/services/room.service';
import { AmenitiesService } from 'src/app/core/services/amenities.service';
import { Amenity } from 'src/app/core/models/Amenity';
import { SizeDetectorService } from 'src/app/core/services/size-detector.service';
import { tap } from 'rxjs/operators';

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
  isTablet: boolean = false;

  rooms$: Observable<Room[]>;
  amenities: Amenity[];

  mapApiKey = environment.mapApiKey;

  markers = [];
  mapLat: number;
  mapLng: number;

  needCountSlides: boolean = true;
  carouselConfig;
  carouselConfigRooms;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomService: RoomService,
    private amenitiesService: AmenitiesService,
    private alert: AlertMessageService,
    private breakpoint: SizeDetectorService
  ) {
    console.log(this.id);

    this.hotelService
      .getHotelBy(this.id)
      .pipe(tap(x => console.log('HOTEl', this.hotel)))
      .subscribe(
        (h: Hotel) => {
          this.hotel = h
          this.loading = false;
          this.getRooms();
          this.defineMapData();

        },
        err => this.alert.error(err.error))

    this.amenitiesService.get()
      .subscribe((x: Amenity[]) => this.amenities = x);

    this.breakpoint.onResize$
      .subscribe((x) => {
        this.isTablet = x < 768 || x == 768;
        this.defineCarousels();
      })
  }

  ngOnInit(): void {
    console.log('ROUTE', this.route);
  }

  getRooms() {
    this.rooms$ = this.roomService.getRoomsByHotel(this.id)

    this.roomService.getRoomsByHotel(this.id)
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
    console.log('this.isTablet', this.isTablet);

    if (this.isTablet) {
      this.carouselConfig = {
        slidesToShow: 1,
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
      return
    }

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
