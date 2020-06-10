import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/core/http/hotel.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-hotels',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewHotelsComponent implements OnInit {

  hotels: Observable<any>;


  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute
  ) {

    this.hotels = this.hotelService.get();
    this.hotelService.get().subscribe(x => console.log('>>', x));


  }

  ngOnInit(): void { }

}
