import { Component, OnInit } from '@angular/core';
// import { Input } from 'src/app/shared/models/form/Input';
// import { Address } from 'src/app/shared/models/form/Address';
// import { ImageInput } from 'src/app/shared/models/form/ImageInput';
// import { Checkbbox } from 'src/app/shared/models/form/Checkbbox';
// import { HotelService } from 'src/app/core/http/hotel.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from 'src/app/admin/admin.service';
// import { BehaviorSubjectService } from 'src/app/core/behaviorsubjects/behavior-subject.service';


@Component({
  selector: 'app-hotels',
  template: `
    <div class="container">
      <mat-tab-group animationDuration="0ms">
          <mat-tab label="View your hotels">view
              <!--<app-view-hotels></app-view-hotels>-->
          </mat-tab>
          <mat-tab label="Add new hotel">
              <app-add-hotel></app-add-hotel>
          </mat-tab>
        </mat-tab-group>
    </div>
  `,
})
export class HotelsComponent implements OnInit {

  amenities;

  constructor(
    // private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private adminService: AdminService,
    // private behaviorSubjectService: BehaviorSubjectService,
  ) {
    this.amenities = this.route.snapshot.data.amenities;
  }
  formStructure;

  ngOnInit(): void {


    // this.formStructure = [

    //   new Input({
    //     key: 'name',
    //     label: 'Name:',
    //     required: true
    //   }),

    //   new Input({
    //     key: 'stars',
    //     label: 'Stars amount:',
    //     required: true
    //   }),

    //   new Input({
    //     type: 'textarea',
    //     key: 'description',
    //     label: 'Description:',
    //     placeholder: 'Description:',
    //     required: true
    //   }),

    //   new Address({
    //     controlType: 'address',
    //     key: 'address',
    //     options: [
    //       new Input({
    //         controlType: 'input',
    //         key: 'city',
    //         label: 'City:',
    //         required: true
    //       }),
    //       new Input({
    //         controlType: 'input',
    //         key: 'street',
    //         label: 'Street:',
    //         required: true
    //       }),
    //       new Input({
    //         controlType: 'input',
    //         key: 'disctrict',
    //         label: 'Disctrict:',
    //         required: true
    //       }),
    //       new Input({
    //         controlType: 'input',
    //         key: 'map',
    //         label: 'Map coordinates:',
    //         required: true,
    //         options: [
    //           { placeholder: 'latitude' },
    //           { placeholder: 'longitude' }
    //         ]
    //       }),
    //     ]
    //   }),

    //   new ImageInput({
    //     controlType: 'images',
    //     key: 'images',
    //     options: []
    //   }),

    //   new Checkbbox({
    //     key: 'amenities',
    //     label: 'Choose amenities:',
    //     options: this.amenities,
    //   }),

    //   // new Input({
    //   //   controlType: 'input',
    //   //   key: 'stars',
    //   //   label: 'Stars amount:',
    //   // }),

    //   // new Input({
    //   //   controlType: 'input',
    //   //   key: 'stars',
    //   //   label: 'Stars amount:',
    //   // })

    // ]



  }

  onValueChanged(hotel: any) {
    console.log('before backend', hotel);

    // this.hotelService.register(hotel)
    //   .subscribe(
    //     (respHotel: any) => {
    //       console.log('respHotel', respHotel);
    //       this.router.navigate([`/hotel/${respHotel._id}`])
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   )

  }

}
