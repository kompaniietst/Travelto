import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss']
})
export class SpecialComponent implements OnInit {

  @Input() specials;

  constructor() { }

  ngOnInit(): void {
  }
  
  trackById(index, item) {
    return item.id;
  }
}
