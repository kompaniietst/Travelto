import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/core/models/Order';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {

  readonly URL = environment.apiUrl;

  @Input() order: Order;
  @Input() state: string;
  @Input() role: string;

  get total() {
    return this.order.price * this.order.nights
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
