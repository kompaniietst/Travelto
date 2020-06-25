import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss']
})
export class AddYourHotelComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,

    private router: Router) {
    if (this.authenticationService.currUser) {
      // console.log('user is');

    }
    this.authenticationService.currUser.subscribe(x => {
      if (x)
        this.router.navigate(['/admin/hotels'])
        
        console.log('user is');
    })

  }

  ngOnInit(): void {
  }

}
