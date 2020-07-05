import { Component, OnInit } from '@angular/core';
import { CustomCurrencyPipe } from 'src/app/pipes/customCurrency.pipe';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
  providers: [CustomCurrencyPipe]
})
export class HotelComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
   // private admin: AdminService,
    //private alert: AlertMessageService
  ) {

  }

  ngOnInit(): void {
    console.log('ROUTE', this.route);


  }

}
