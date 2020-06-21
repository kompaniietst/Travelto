import { Component, OnInit } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Room } from 'src/app/core/models/Room';
import { RoomService } from 'src/app/core/services/room.service';
import { Control } from 'src/app/core/models/Control';
import { AmenitiesService } from 'src/app/core/services/amenities.service';
import { Amenity } from 'src/app/core/models/Amenity';
import { CitiesService } from 'src/app/core/services/cities.service';
import { City } from 'src/app/core/models/City';
import { CustomCurrencyPipe } from 'src/app/pipes/customCurrency.pipe';
import { FilterTabsService } from 'src/app/core/services/filter-tabs.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [CustomCurrencyPipe]
})
export class CatalogComponent implements OnInit {

  rooms$: Observable<Room[]>
  amenities: Amenity[];
  formStructure$: Observable<Control[]>;

  constructor(
    private roomService: RoomService,
    private amenitiesService: AmenitiesService,
    private citiesService: CitiesService,
  ) {

    this.rooms$ = this.roomService.get();

    this.amenitiesService.get()
      .subscribe((x:Amenity[]) => this.initFormStructure(x));
  }

  initFormStructure(amenities: Amenity[]) {

    this.formStructure$ = of([
      new Control({
        controlType: 'sliderRange',
        key: 'price',
        value: [50, 400]
      }),
      new Control({
        controlType: 'checkbox',
        key: 'specials',
        options: [
          { _id: "1", label: "25%" },
          { _id: "2", label: "Recommend" },
          { _id: "3", label: "Best price" }
        ],
      }),
      new Control({
        controlType: 'checkbox',
        key: 'amenities',
        label: 'Choose amenities:',
        options: amenities
      }),

    ]);
  }

  ngOnInit(): void {
  }

  onSubmit(formData) {

  }

  trackById(index, item) {
    return item.id;
  }
}
