import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from 'src/app/core/models/Room';
import { RoomService } from 'src/app/core/services/room.service';
import { Control } from 'src/app/core/models/Control';
import { AmenitiesService } from 'src/app/core/services/amenities.service';
import { Amenity } from 'src/app/core/models/Amenity';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  rooms$: Observable<Room[]>
  amenities: Amenity[];
  formStructure$: Observable<Control[]>;

  constructor(
    private roomService: RoomService,
    private amenitiesService: AmenitiesService
  ) {
    this.rooms$ = this.roomService.get();
    // this.roomService.get().subscribe(x => console.log('x', x));
    this.amenitiesService.get().subscribe((x: Amenity[]) => this.initFormStructure(x));
  }

  initFormStructure(amenities: Amenity[]) {
    console.log('A', amenities);

    this.formStructure$ = of([
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

  onSubmit(formData) {

  }
}
