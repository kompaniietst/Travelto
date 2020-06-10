import { Component, OnInit } from '@angular/core';
// import { Input } from 'src/app/shared/models/form/Input';
// import { Address } from 'src/app/shared/models/form/Address';
// import { ImageInput } from 'src/app/shared/models/form/ImageInput';
// import { Checkbbox } from 'src/app/shared/models/form/Checkbbox';
// import { HotelService } from 'src/app/core/http/hotel.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from 'src/app/admin/admin.service';
import { Control } from 'src/app/core/models/Control';
// import { BehaviorSubjectService } from 'src/app/core/behaviorsubjects/behavior-subject.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddHotelComponent implements OnInit {

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


    this.formStructure = [

      new Control({
        controlType: 'input',
        key: 'name',
        placeholder: 'Name:',
        required: true
      }),

      new Control({
        controlType: 'input',
        key: 'stars',
        placeholder: 'Stars amount:',
        required: true
      }),

      new Control({
        controlType: 'input',
        type: 'textarea',
        key: 'description',
        placeholder: 'Description:',
        required: true
      }),

      new Control({
        controlType: 'address',
        key: 'address',
        options: [
          new Control({
            controlType: 'input',
            key: 'city',
            placeholder: 'City:',
            required: true
          }),
          new Control({
            controlType: 'input',
            key: 'street',
            placeholder: 'Street:',
            required: true
          }),
          new Control({
            controlType: 'input',
            key: 'disctrict',
            placeholder: 'Disctrict:',
            required: true
          }),
          new Control({
            controlType: 'input',
            key: 'map',
            label: 'Map coordinates:',
            required: true,
            options: [
              { placeholder: 'latitude' },
              { placeholder: 'longitude' }
            ]
          }),
        ]
      }),

      new Control({
        controlType: 'images',
        key: 'images',
        options: []
      }),

      new Control({
        controlType: 'checkbox',
        key: 'amenities',
        label: 'Choose amenities:',
        options: this.amenities,
      }),
    ]
  }

  onValueChanged(hotel: any) {
    // console.log('before backend', hotel);

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
