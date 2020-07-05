import { Component, OnInit } from '@angular/core';
import { CustomCurrencyPipe } from 'src/app/pipes/customCurrency.pipe';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
  providers: [CustomCurrencyPipe]
})
export class HotelComponent implements OnInit {

  

  constructor(
    
  ) {
    
  }

  ngOnInit(): void {
    

  }

}
