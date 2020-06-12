import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Observable } from 'rxjs';
import { Room } from 'src/app/core/models/Room';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewRoomsComponent implements OnInit {

  rooms$: Observable<Room[]>;
  loading = true;

  constructor(private admin: AdminService) {
    this.rooms$ = this.admin.getRooms();
    this.admin.getRooms().subscribe(x => this.loading = false);
  }

  ngOnInit(): void {
  }

}
