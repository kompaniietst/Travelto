import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hotel } from 'src/app/core/models/Hotel';
import { HotelService } from 'src/app/core/services/hotel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hotel: Hotel;

  mapApiKey = environment.mapApiKey;
  markers = [];
  mapLat = 31.780923;
  mapLng = 35.219538;

  constructor(private hotelService: HotelService) {
    this.hotelService.get()
      .subscribe((x: Hotel[]) =>
        this.markers = x
          .map(h => {
            return {
              lat: +h.address.map[0],
              lng: +h.address.map[1]
            }
          })
      )
  }

  ngOnInit(): void { }

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
