import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Hotel } from 'src/app/core/models/Hotel';

@Component({
  selector: 'app-view-hotels',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewHotelsComponent implements OnInit {

  hotels$: Observable<Hotel[]>;
  loading = false;

  constructor(
    private admin: AdminService,
    private route: ActivatedRoute
  ) {

    this.hotels$ = this.admin.getHotels();
    this.admin.getHotels().subscribe(x => this.loading = false);
  }

  ngOnInit(): void { }

}
