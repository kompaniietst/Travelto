import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Control } from 'src/app/core/models/Control';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  formStructure$: Observable<Control[]> = of([
    new Control({
      controlType: 'input',
      key: 'email',
      placeholder: 'Enter your email',
    })
  ]);

  constructor() { }

  ngOnInit(): void { }

}
