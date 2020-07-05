import { Component, OnInit } from '@angular/core';
import { AmenitiesService } from 'src/app/core/services/amenities.service';
import { Control } from 'src/app/core/models/Control';
import { Observable, of } from 'rxjs';
import { Amenity } from 'src/app/core/models/Amenity';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {

  formStructure$: Observable<Control[]>;

  constructor(private amenitiesService: AmenitiesService) {
    this.amenitiesService.get()
      .subscribe((x: Amenity[]) => this.initFormStructure(x));
  }

  initFormStructure(amenities: Amenity[]) {

    this.formStructure$ = of([
      new Control({
        controlType: 'sliderRange',
        key: 'price',
        value: [50, 250]
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

  ngOnInit(): void { }

}
