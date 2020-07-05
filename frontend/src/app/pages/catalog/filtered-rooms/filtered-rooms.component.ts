import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from 'src/app/core/models/Room';
import { RoomService } from 'src/app/core/services/room.service';
import { Control } from 'src/app/core/models/Control';
import { Amenity } from 'src/app/core/models/Amenity';
import { FilterTabsService } from 'src/app/core/services/filter-tabs.service';
import { FilterItem } from 'src/app/core/models/FilterItem';
import { map, delay } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { FormOrderComponent } from 'src/app/shared/form-order/form-order.component';

@Component({
  selector: 'app-filtered-rooms',
  templateUrl: './filtered-rooms.component.html',
  styleUrls: ['./filtered-rooms.component.scss']
})
export class FilteredRoomsComponent implements OnInit {

  rooms$: Observable<Room[]>
  amenities: Amenity[];
  
  filteredRooms$: Observable<Room[]>
  showSpinner: boolean = false;
  priceFilter: { key: string, price: number[] };
  cityFilter: { key: string, cityId: string };

  config = {
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    needLink: true,
    arrows: true,
    autoplay: true,
    draggable: true,
  };

  thumbnailsConfig = {
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: 'linear',
    autoplay: true,
    arrows: false,
    draggable: true,
    focusOnSelect: true,
  };

  constructor(
    private roomService: RoomService,
    private filterTabsService: FilterTabsService,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
  ) {

    this.rooms$ = this.roomService.get();

    this.filterTabsService.getFilters()
      .subscribe((x: FilterItem[]) => {
        if (!x || x.length == 0) {
          setTimeout(() => {
            this.filteredRooms$ = this.rooms$;
          }, 2000);
          return;
        }

        this.filterRooms(x as FilterItem[]);
      })

    this.filterTabsService.getPriceFilter()                      // define values to filter by price
      .subscribe((x) => this.priceFilter = {
        key: "price",
        price: x
      })

    this.localStorageService.onCityChange()                      // define values to filter by city
      .subscribe((cityId: string) => {
        if (cityId) {
          this.cityFilter = {
            key: "city",
            cityId: cityId
          }
        }
      })
  }

  ngOnInit(): void { }

  filterRooms(filters: FilterItem[]) {

    this.showSpinner = true;

    this.filteredRooms$ = this.rooms$
      .pipe(delay(500),
        map(rooms => {
          this.showSpinner = false

          var filteredRooms: Room[];

          filters.forEach(filter => {

            if (filter.type == 'specials') {
              var filterIds = filters
                .filter(f => f.type == filter.type)
                .map(_ => _._id);
              filteredRooms = this.filterBySpecials(filterIds, rooms);
            }

            if (filter.type == 'amenities') {
              var filterIds = filters
                .filter(f => f.type == filter.type)
                .map(_ => _._id);
              filteredRooms = this.filterByAmenities(filterIds, rooms);
            }

          })
          return filteredRooms;
        }))
  }

  filterBySpecials(filterIds: string[], rooms: Room[]) {
    return rooms.filter((r: Room) =>
      filterIds.every(id => r.specials.some(s => s._id == id))
    )
  }

  filterByAmenities(filterIds: string[], rooms: Room[]) {
    return rooms.filter((r: Room) =>
      filterIds.every(id => r.hotel.amenities.some(s => s._id == id))
    )
  }

  trackById(index, item) {
    return item.id;
  }

  /* FOR ORDER FORM */

  formOrderControls$ = of([
    new Control({
      controlType: 'dateTimePicker',
      key: 'date',
      placeholder: 'Check in - check out',
    }),
    new Control({
      controlType: 'pex',
      key: 'pex',
      placeholder: 'Guests:',
      value: { adults: 2, children: 0 }
    })
  ]);

  openFormOrder(room: Room) {
    const dialogRef = this.dialog.open(FormOrderComponent, {
      panelClass: 'popup',
      data: {
        controls: this.formOrderControls$,
        room: room
      }
    });
  }

}
