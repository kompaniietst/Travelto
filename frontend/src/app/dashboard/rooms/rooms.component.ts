import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin, pipe } from 'rxjs';
import { Room } from 'src/app/core/models/Room';
import { RoomService } from 'src/app/core/services/room.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from 'src/app/core/models/User';
import { mergeMap, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})

export class RoomsComponent implements AfterViewInit {

  rooms$: Observable<Room[]>;
  loading = true;
  countRooms: number;
  currUser: User;

  private roomSubject: BehaviorSubject<Room[]> = new BehaviorSubject([]);
  rooms: Room[] = [];

  @ViewChild('tabGroup') tabGroupRef;

  constructor(
    private service: RoomService,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.rooms$ = this.roomSubject.asObservable();

    this.auth.currUser                                  // get rooms by current user
      .pipe(tap(x => console.log('rooms$', x)),
        mergeMap((user: User) =>
          this.service
            .getRoomsByCurrRole(user.role, user._id)))
      .subscribe(
        (rooms: Room[]) => {
          this.pushToBehaviorSubject(rooms);
          this.stopSpinner();
          this.count(rooms);
        },
        err => console.log(err))
  }

  pushToBehaviorSubject(rooms: Room[]) {
    this.rooms = rooms;
    this.roomSubject.next([...this.rooms]);
  }

  stopSpinner() {
    this.loading = false;
  }

  count(rooms: Room[]) {
    this.countRooms = rooms.length;
  }

  ngAfterViewInit(): void {
    this.route.queryParams
      .subscribe(x => this.tabGroupRef.selectedIndex = x.tab)
  }

  onAdd(formData: Room) {
    let room_id = formData._id;
    this.service.getRoomBy(room_id)
      .subscribe((room: Room) => {

        this.pushSingleToBehaviorSubject(room);
        this.backToFirstTab();

        this.router.navigate(["."], { relativeTo: this.route });
      })
  }

  pushSingleToBehaviorSubject(room: Room) {
    this.rooms.push(room);
    this.roomSubject.next([...this.rooms]);
  }

  backToFirstTab() {
    this.tabGroupRef.selectedIndex = 0;
    window.scrollTo(0, 0);
  }

  onEdit(_id: string) {
    this.service.getRoomBy(_id)
      .pipe(tap(x => console.log('R', x)))
      .subscribe((room: Room) => {

        this.editSingleFromBehaviorSubject(room, _id);
        this.backToFirstTab();
        this.router.navigate(["."], { relativeTo: this.route });
      })
  }

  editSingleFromBehaviorSubject(room: Room, _id: string) {
    let i = this.rooms.findIndex(h => h._id == _id);
    this.rooms[i] = room;
    this.roomSubject.next([...this.rooms]);
  }

  onRemove(_id: string) {
    this.service.removeRoom(_id)
      .subscribe(_ => this.removeSingleFromBehaviorSubject(_id))
  }

  removeSingleFromBehaviorSubject(_id: string) {
    let i = this.rooms.findIndex(h => h._id == _id);
    this.rooms.splice(i, 1)
    this.roomSubject.next([...this.rooms]);
  }

  selectedTabChange(e) {
    var viewTab = e.index == 0;
    var addTab = e.index == 1;

    if (addTab)
      this.router.navigate(["create"], { relativeTo: this.route });
    if (viewTab)
      this.router.navigate(["."], { relativeTo: this.route });
  }

  trackById(index, item) {
    return item.id;
  }
}