import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Observable } from 'rxjs';
import { City } from 'src/app/core/models/City';

@Component({
  selector: 'app-view-cities',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewCitiesComponent implements OnInit {

  cities$: Observable<City[]>;

  constructor(
    private admin: AdminService,
  ) {
    this.cities$ = this.admin.getCities();
  }

  ngOnInit(): void { }

}
