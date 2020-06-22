import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminService } from 'src/app/admin/admin.service';
import { Hotel } from 'src/app/core/models/Hotel';
import { Room } from 'src/app/core/models/Room';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { Amenity } from 'src/app/core/models/Amenity';
import { environment } from 'src/environments/environment';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  id: string = this.route.snapshot.params.id;
  room: Room;

  loading = true;

  carouselConfig = {
    slidesToShow: 2,
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
    private roomService: RoomService,
    private alert: AlertMessageService
  ) {

    this.roomService
      .getRoomBy(this.id)
      .subscribe(
        (r: Room) => {
          this.room = r
          console.log('Room', this.room);
          this.loading = false;
        },
        err => this.alert.error(err.error))
  }

  ngOnInit(): void {}

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
