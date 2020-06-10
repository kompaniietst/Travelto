import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/core/http/room.service';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewRoomsComponent implements OnInit {

  rooms: any;

  constructor(private roomService: RoomService) {
    this.rooms = this.roomService.get();
    this.roomService.get().subscribe(x => console.log('>>', x));
  }

  ngOnInit(): void {
  }

}
