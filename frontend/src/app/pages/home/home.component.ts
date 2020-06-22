import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hotel } from 'src/app/core/models/Hotel';
import { HotelService } from 'src/app/core/services/hotel.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hotel: Hotel;

  readonly URL = environment.apiUrl;

  mapApiKey = environment.mapApiKey;
  markers = [];
  mapLat = 31.780923;
  mapLng = 35.219538;

  constructor(
    private hotelService: HotelService,
    private http: HttpClient
  ) {
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

    this.http.get(`${this.URL}/fullrooms`)
      .subscribe(x => console.log('>>>>>', x))
  }

  ngOnInit(): void { }

  trackById(index, item) {
    return item.id;
  }
}
