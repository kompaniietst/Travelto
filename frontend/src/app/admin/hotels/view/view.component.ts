import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Hotel } from 'src/app/core/models/Hotel';
import { ReversePipe } from 'src/app/pipes/reverse.pipe';

@Component({
  selector: 'app-view-hotels',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [{
    provide: ReversePipe
  }]
})
export class ViewHotelsComponent implements OnInit {

  hotels$: Observable<Hotel[]>;
  loading = true;

  constructor(
    private admin: AdminService,
    private route: ActivatedRoute
  ) {

    this.hotels$ = this.admin.getHotels();
    this.admin.getHotels()
      .subscribe(
        (x: Hotel[]) => {
          this.loading = false
        }, 
        err => console.log(err));
  }

  ngOnInit(): void { }

  trackById(index, item) {
    return item.id;
  }
}
