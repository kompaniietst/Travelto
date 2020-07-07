import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/core/models/Order';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  readonly URL = environment.apiUrl;
  
  @Input() order: Order;

  constructor() { }

  ngOnInit(): void {
  }

}
