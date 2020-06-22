import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/core/models/Room';
import { LimitPipe } from 'src/app/pipes/limit.pipe';
import { Hotel } from 'src/app/core/models/Hotel';
import { HotelService } from 'src/app/core/services/hotel.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [LimitPipe]
})
export class CardComponent implements OnInit {

  @Input() room: Room;
  @Input() limit: number;
  @Input() quantity: number;
  slides: string[];
  showbutton: boolean = false;

  carouselConfigRooms = {
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

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    if (this.limit) this.showbutton = true;
    this.slides = [...this.room.hotel.images, ...this.room.images];
  }

  showMore() {
    if (this.limit && !this.quantity) {
      this.limit = this.room.textFeatures.length;
      this.showbutton = false;
      return;
    }

    if (this.limit && this.quantity)
      this.limit = +this.limit + +this.quantity;

    if (this.limit == this.room.textFeatures.length || this.limit > this.room.textFeatures.length)
      this.showbutton = false
  }

  trackById(index, item) {
    return item.id;
  }
}
