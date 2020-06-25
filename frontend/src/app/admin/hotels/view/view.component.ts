import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '../../admin.service';
import { Hotel } from 'src/app/core/models/Hotel';
import { ReversePipe } from 'src/app/pipes/reverse.pipe';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

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
    private auth: AuthenticationService
  ) {

    const currUserId = this.auth.getCurrUser()._id;

    this.hotels$ = this.admin.getHotelsBy(currUserId);

    this.admin.getHotelsBy(currUserId)
      .subscribe(
        (x: Hotel[]) => {
          this.loading = false;
          console.log('hotels$', x);

        },
        err => console.log(err));
  }

  ngOnInit(): void { }

  trackById(index, item) {
    return item.id;
  }
}
