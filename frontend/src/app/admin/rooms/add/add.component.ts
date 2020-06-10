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
// import { FilterDropdown } from 'src/app/shared/models/form/FilterDropdown';
// import { Dropdown } from 'src/app/shared/models/form/Dropdown';
// import { RoomService } from 'src/app/core/http/room.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddRoomComponent implements OnInit {

  amenities;
  hotels: any = [];

  constructor(
    // private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private adminService: AdminService,
    // private behaviorSubjectService: BehaviorSubjectService,
    // private hotelService: HotelService
  ) {
    console.log(':::::::', this.route.snapshot.data);
    // this.behaviorSubjectService.amenities.subscribe(x => {
    // this.amenities = this.route.snapshot.data.amenities;
    // this.hotels = this.route.snapshot.data.hotels.map(x => { return { id: x._id, label: x.name } });
    //   console.log('this.amenities', this.amenities);

    // this.hotelService.get()
    //   .subscribe(x => this.hotels = x);
  }

  formStructure;

  ngOnInit(): void {

    console.log('HOTELS', this.hotels);


    this.formStructure = [
      new Control({
        controlType: 'input',
        key: 'hotelId',
        label: 'Select hotel name',
        options: this.hotels,
        // placeholder: 'Select hotel name',
        required: true
      }),

      new Control({
        controlType: 'input',
        key: 'name',
        // label: 'Name:',
        placeholder: 'Name:',
        required: true
      }),
      new Control({
        controlType: 'input',
        type: 'textarea',
        key: 'description',
        // label: 'Description:',
        placeholder: 'Description:',
        required: true
      }),
      new Control({
        controlType: 'input',
        key: 'price',
        // label: 'Price: (per night)',
        placeholder: '$ Price: (per night)',
        required: true
      }),

      new Control({
        controlType: 'checkbox',
        key: 'specials',
        label: 'Choose specials:',
        options: [
          { id: "1", label: "25%" },
          { id: "2", label: "Рекомендуем" },
          { id: "3", label: "Лучшая цена" }
        ],
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

  onValueChanged(room: any) {
    // console.log('before backend', room);

    // this.roomService.register(room)
    //   .subscribe(
    //     (respRoom: any) => {
    //       console.log('respRoom', respRoom);
    //       // this.router.navigate([`/room/${respRoom._id}`])
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   )

  }

}