import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/core/models/Room';
import { LimitPipe } from 'src/app/pipes/limit.pipe';
import { Hotel } from 'src/app/core/models/Hotel';
import { HotelService } from 'src/app/core/services/hotel.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [LimitPipe]
})
export class CardComponent implements OnInit {

  @Input() room: Room;
  @Input() id;
  @Input() limit: number;
  @Input() quantity: number;
  @Input() config: any;
  @Input() thumbnailsConfig: any;
  slides: string[];
  showbutton: boolean = false;



  // constructor(private hotelService: HotelService) { }
  constructor(private ls: LocalStorageService) {
    this.ls.get()
      .subscribe((x: any) => {
        
        // this.id = x.city._id
        // console.log('slides', this.slides);
        
      })
    }
    
    ngOnInit(): void {
      console.log('card render ', this.room.hotel.address.city.label);
      
      console.log('-------', this.id);



    if (this.limit) this.showbutton = true;

    if (!this.thumbnailsConfig) {
      this.slides = this.room.images;
      return;
    }
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
