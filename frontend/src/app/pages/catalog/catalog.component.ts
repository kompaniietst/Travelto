import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from 'src/app/core/models/Room';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  rooms$: Observable<Room[]>

  constructor(
    private roomService: RoomService,

  ) {
    this.rooms$ = this.roomService.get();
    this.roomService.get().subscribe(x => console.log('x', x))
  }

  // thumbnailsConfig = {
  //   speed: 300,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   cssEase: 'linear',
  //   autoplay: true,
  //   arrows: false,
  //   draggable: true,
  //   focusOnSelect: true,
  // };

  ngOnInit(): void {
  }

}
