import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class HotelItemComponent implements OnInit {

  @Input() item;

  hotelAmenities = [];
  allAmenities: [];

  constructor(private route: ActivatedRoute) {
    this.allAmenities = this.route.snapshot.data.amenities;
    console.log('this.allAmenities', this.allAmenities);
  }

  ngOnInit(): void {
    this.hotelAmenities = this.allAmenities.filter((a: any) => this.item.amenities.some(x => x == a._id))
  }

}
