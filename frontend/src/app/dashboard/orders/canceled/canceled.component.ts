import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/core/models/Order';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-canceled',
  templateUrl: './canceled.component.html',
  styleUrls: ['./canceled.component.scss']
})
export class CanceledComponent implements OnInit {

  readonly URL = environment.apiUrl;
  
  @Input() order: Order;
  @Input() state: string;
  @Input() role: string;

  profileImage: string;

  constructor() { }

  ngOnInit(): void {
    this.profileImage = this.order.user.image;
  }

}

