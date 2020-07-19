import { Component, OnInit, ViewChild, ElementRef, TemplateRef, AfterViewInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Hotel } from 'src/app/core/models/Hotel';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { HotelService } from 'src/app/core/services/hotel.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { mergeMap, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit, AfterViewInit {

  hotels$: Observable<Hotel[]>;
  loading = true;
  countHotels: number;

  private hotelSubject: BehaviorSubject<Hotel[]> = new BehaviorSubject([]);
  hotels: Hotel[] = [];

  @ViewChild('tabGroup') tabGroupRef;

  constructor(
    private service: HotelService,
    private auth: AuthenticationService,
    private route: ActivatedRoute
  ) {

    this.hotels$ = this.hotelSubject.asObservable();

    this.auth.currUser                                  // get hotels by current user
      .pipe(
        tap(x => console.log('hotels$', x)),
        switchMap((user: User) =>
          this.service
            .getHotelsByCurrRole(user.role, user._id)))
      .subscribe(
        (x: Hotel[]) => {

          this.hotels = x;
          this.hotelSubject.next([...this.hotels]);

          this.loading = false;
          this.countHotels = x.length;
        },
        err => console.log(err))
  }

  ngAfterViewInit(): void {
    this.route.queryParams
      .subscribe(x => this.tabGroupRef.selectedIndex = x.tab)
  }

  ngOnInit(): void { }

  onAdd(formData: Hotel) {
    this.service.register(formData)
      .subscribe(
        (x: Hotel) => {

          this.hotels.push(x);
          this.hotelSubject.next([...this.hotels]);

          this.tabGroupRef.selectedIndex = 0;
          window.scrollTo(0, 0)
        })
  }

  onEdit(data: { _id: string, formData: Hotel }) {
    console.log('edit', data);
    this.service.editHotel(data._id, data.formData)
      .subscribe(
        (x: Hotel) => {
          let i = this.hotels.findIndex(h => h._id == data._id);
          this.hotels[i] = x;

          this.hotelSubject.next([...this.hotels]);
        },
        err => console.log(err)
      )
  }

  onRemove(_id: string) {
    console.log('rem ', _id);
    this.service.removeHotel(_id)
      .subscribe(_ => {
        let i = this.hotels.findIndex(h => h._id == _id);
        this.hotels.splice(i, 1)
        this.hotelSubject.next([...this.hotels]);
      })
  }

  trackById(index, item) {
    return item.id;
  }
}