import { Component, OnInit } from '@angular/core';
// import { Input } from 'src/app/shared/models/form/Input';
// import { Radio } from 'src/app/shared/models/form/Radio';
import { AdminService } from '../admin.service';
import { error } from '@angular/compiler/src/util';
import { AlertMessageService } from 'src/app/core/services/alert-message.service';
import { ActivatedRoute } from '@angular/router';
// import { ImageInput } from 'src/app/shared/models/form/ImageInput';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-amenities',
  template: `
      <div class="container">
        <mat-tab-group animationDuration="0ms">
            <mat-tab label="Add new amenities">
            <!--<app-add-amenities></app-add-amenities>-->
            </mat-tab>
            <mat-tab label="View your amenities">
            <!--<app-view-amenities></app-view-amenities>-->
            </mat-tab>
          </mat-tab-group>
      </div>
  `
})
export class AmenitiesComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}