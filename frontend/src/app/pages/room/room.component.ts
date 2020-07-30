import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/core/models/Room';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { environment } from 'src/environments/environment';
import { RoomService } from 'src/app/core/services/room.service';
import { tap } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewportSizeDetector } from 'src/app/core/extends/ViewportSizeDetector';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent extends ViewportSizeDetector implements OnInit {

  id: string = this.route.snapshot.params.id;
  room: Room;

  loading = true;

  carouselConfig;

  mapApiKey = environment.mapApiKey;

  markers = [];
  mapLat: number;
  mapLng: number;

  @HostListener('window:resize', ['$event'])
  onResize = () => this.defineScreenSize();

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private alert: AlertMessageService,
    breakpointObserver: BreakpointObserver
  ) {
    super(breakpointObserver);
    this.defineScreenSize();

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


    this.defineCarouelConfig()
  }

  ngOnInit(): void { }

  defineCarouelConfig() {
    this.screenXSmall || this.screenSmall
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
