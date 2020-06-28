import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/core/models/Order';

@Component({
  selector: 'app-member-order-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class MemberOrderItemComponent implements OnInit {

  @Input() order: Order;

  constructor() { }

  ngOnInit(): void {
  }

}
