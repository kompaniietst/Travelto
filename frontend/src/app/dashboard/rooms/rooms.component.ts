import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin, pipe } from 'rxjs';
import { Room } from 'src/app/core/models/Room';
import { RoomService } from 'src/app/core/services/room.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from 'src/app/core/models/User';
import { mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})

export class RoomsComponent implements OnInit {

  rooms$: Observable<Room[]>;
  loading = true;
  countRooms: number;
  currUser: User;

  private roomSubject: BehaviorSubject<Room[]> = new BehaviorSubject([]);
  rooms: Room[] = [];

  @ViewChild('tabGroup') tabGroupRef;

  constructor(
    private service: RoomService,
    private auth: AuthenticationService
  ) {

    this.rooms$ = this.roomSubject.asObservable();

    this.auth.currUser                                  // get rooms by current user
      .pipe(tap(x => console.log('rooms$', x)),
        mergeMap((user: User) =>
          this.service
            .getRoomsByCurrRole(user.role, user._id)))
      .subscribe(
        (x: Room[]) => {

          this.rooms = x;
          this.roomSubject.next([...this.rooms]);

          this.loading = false;
          this.countRooms = x.length;
        },
        err => console.log(err))
  }

  ngOnInit(): void { }

  onAdd(formData: Room) {
    let room_id = formData._id;
    this.service.getRoomBy(room_id)
      .subscribe((x: Room) => {

        this.rooms.push(x);
        this.roomSubject.next([...this.rooms]);

        this.tabGroupRef.selectedIndex = 0;
        window.scrollTo(0, 0)
      })
  }

  onEdit(_id: string) {
    console.log('edit', _id);
    this.service.getRoomBy(_id)
      .pipe(tap(x => console.log('R', x)))
      .subscribe((x: Room) => {

        let i = this.rooms.findIndex(h => h._id == _id);
        this.rooms[i] = x;
        this.roomSubject.next([...this.rooms]);

        this.tabGroupRef.selectedIndex = 0;
        window.scrollTo(0, 0)
      })
  }

  onRemove(_id: string) {
    console.log('rem ', _id);
    this.service.removeRoom(_id)
      .subscribe(_ => {
        let i = this.rooms.findIndex(h => h._id == _id);
        this.rooms.splice(i, 1)
        this.roomSubject.next([...this.rooms]);
      })
  }

  trackById(index, item) {
    return item.id;
  }
}