import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/core/models/Order';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

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
