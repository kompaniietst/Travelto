import { Component, OnInit } from '@angular/core';
import { Input } from 'src/app/shared/models/form/Input';
import { Radio } from 'src/app/shared/models/form/Radio';
import { error } from '@angular/compiler/src/util';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { ActivatedRoute } from '@angular/router';
import { ImageInput } from 'src/app/shared/models/form/ImageInput';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-view-amenities',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewAmenitiesComponent implements OnInit {

  amenities = [];

  constructor(
    private adminService: AdminService,
    private alert: AlertMessageService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {

    this.amenities = this.route.snapshot.data.amenities;
    console.log('==', this.amenities);

  }



  displayedColumns: string[] = ['_id', 'label', 'checked', 'image', 'edit'];

  onValueChanged(data) {
    this.adminService.registerAmenity(data)
      .subscribe(
        x => {
          console.log('amenity_ ', x);
          this.alert.success('Item is successfuly added.');
        }
      ),
      error => console.log(error)
  }

  ngOnInit(): void {
    this.amenities.forEach((x, i) => x['position'] = i);
  }

  currId;
  edit(id) {
    console.log(id);

    this.currId = id;
  }

  onUpload(e) {
    var selectedFiles = [e.target.files[0]];

    const formData: FormData = new FormData();

    for (const img of selectedFiles) {
      formData.append('files', img);
    }

    this.http.post('http://localhost:4000/imgs', formData)
      .subscribe(
        (resp_images: any) => {
          console.log('resp_images ', resp_images);
          resp_images.forEach(img => this.saveImage('http://localhost:4000/images/' + img.filename));
        },
        error => {
          console.log(error);
        }
      )

  }

  saveImage(img) {
    this.http.put('http://localhost:4000/amenities', { id: this.currId, img: img })
      .subscribe(
        (resp_images: any) => {
          console.log('resp_imagesRESUULT ', resp_images);
        },
        error => {
          console.log(error);
        }
      )
  }
}
