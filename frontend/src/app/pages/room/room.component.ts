import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hotel } from 'src/app/core/models/Hotel';
import { Room } from 'src/app/core/models/Room';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { Amenity } from 'src/app/core/models/Amenity';
import { environment } from 'src/environments/environment';
import { RoomService } from 'src/app/core/services/room.service';
import { SizeDetectorService } from 'src/app/core/services/size-detector.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  id: string = this.route.snapshot.params.id;
  room: Room;
  isTablet: boolean = false;

  loading = true;

  carouselConfig;

  mapApiKey = environment.mapApiKey;

  markers = [];
  mapLat: number;
  mapLng: number;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private alert: AlertMessageService,
    private breakpoint: SizeDetectorService
  ) {

    this.roomService
      .getRoomBy(this.id)
      .pipe(tap(x => console.log('Room', this.room)))
      .subscribe(
        (r: Room) => {
          this.room = r
          this.loading = false;
          this.defineMapData();
        },
        err => this.alert.error(err.error))

    this.breakpoint.onResize$
      .subscribe((x) => {
        this.isTablet = x < 768 || x == 768
        this.defineCarouelConfig()
      })
  }

  ngOnInit(): void { }

  defineCarouelConfig() {
    this.isTablet
      ? this.carouselConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true
      }
      : this.carouselConfig = {
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true
      }

  }

  defineMapData() {
    this.markers = [
      { lat: +this.room.hotel.address.map[0], lng: +this.room.hotel.address.map[1] },
    ];
    this.mapLat = +this.room.hotel.address.map[0];
    this.mapLng = +this.room.hotel.address.map[1];
  }

  trackById(index, item) {
    return item.id;
  }
}
