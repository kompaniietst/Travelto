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
  mapLat = 36;
  mapLng = 30;

  constructor(
    private hotelService: HotelService,
  ) {
    this.hotelService.get()
      .subscribe((x: Hotel[]) =>{
        this.markers = x
          .map(h => {
            return {
              lat: +h.address.map[0],
              lng: +h.address.map[1]
            }
          }
          
          );
          // console.log('this.markers',this.markers);
        }
      )
  }

  ngOnInit(): void { }

  trackById(index, item) {
    return item.id;
  }
}
