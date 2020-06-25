import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Observable } from 'rxjs';
import { Room } from 'src/app/core/models/Room';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewRoomsComponent implements OnInit {

  rooms$: Observable<Room[]>;
  loading = true;

  constructor(private admin: AdminService,
    private auth: AuthenticationService) {

    const currUserId = this.auth.getCurrUser()._id;

    console.log('ddd');
    
    this.rooms$ = this.admin.getRoomsBy(currUserId);

    this.admin.getRoomsBy(currUserId).subscribe(x => {
      console.log('__rooms', x);

      this.loading = false
    });
  }

  ngOnInit(): void {
  }

  trackById(index, item) {
    return item.id;
  }
}
