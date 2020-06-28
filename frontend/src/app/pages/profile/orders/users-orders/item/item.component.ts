import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/core/models/Order';

@Component({
  selector: 'app-user-order-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class UserOrderItemComponent implements OnInit {

  @Input() order: Order;

  constructor() { }

  ngOnInit(): void {
  }
  
  arrayFrom(number: number) {
    return Array.from(Array(number))
  }
  
  trackById(index, item) {
    return item.id;
  }

  cancel(_id: string) { }
}
