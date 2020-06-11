import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() starRating: number;

  get starsAmount(): number[] {
    return Array.from(Array(5).keys())
  };

  trackById(index, item) {
    return item.id;
  }
}
