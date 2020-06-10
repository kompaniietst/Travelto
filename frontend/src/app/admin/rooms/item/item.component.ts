import { Component, OnInit, Input } from '@angular/core';
import { HotelService } from 'src/app/core/http/hotel.service';

@Component({
  selector: 'app-room-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class RoomItemComponent implements OnInit {

  @Input() item;
  hotelInfo;

  constructor(private hotelService: HotelService) {
  }

  ngOnInit(): void {
    this.hotelService.getById(this.item?.hotelId)
      .subscribe(x => this.hotelInfo = x)
  }

}
