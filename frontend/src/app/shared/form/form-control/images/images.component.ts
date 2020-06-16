import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Control } from 'src/app/core/models/Control';
import { AdminService } from 'src/app/admin/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ImagesComponent),
    multi: true
  }]
})
export class ImagesComponent implements OnInit, ControlValueAccessor {

  @Input() control: Control;

  form: FormGroup = new FormGroup({})

  eventTargetFiles: File[] = [];
  public imagesToShow = [];

  readonly URL = environment.apiUrl;
  showSpinner = false;
  currId: string;

  constructor(
    private router: Router,
    private admin: AdminService
  ) { }

  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.form.controls.formKey.valueChanges.subscribe(fn)
  }

  registerOnTouched(fn: any): void { }

  ngOnInit(): void {
    console.log('Deafult', this.control.value);

    var defaultData = this.control.value;

    if (this.defaultDataExist() && Array.isArray(this.defaultDataExist())) { // form multiple images
      this.imagesToShow = defaultData;

      this.form.addControl('formKey', new FormArray([]))

      defaultData.forEach(x => {
        (this.form.get('formKey') as FormArray)
          .push(new FormControl(x))
      })
      return;
    }

    if (this.defaultDataExist()) {
      this.form.addControl('formKey', new FormControl(defaultData)); // form single images

      this.imagesToShow = [defaultData];
      return
    }

    this.form.addControl('formKey', new FormArray([]))
  }

  defaultDataExist() {
    return this.control.value;
  }

  upload(event) {
    var formData = new FormData();
    this.eventTargetFiles = event.target.files;

    this.showImages(event);

    for (const file of event.target.files) {
      formData.append('files', file)
    }

    this.sendImagesToServer(formData);
  }

  sendImagesToServer(formData) {

    this.showSpinner = true;

    console.log('bef server', this.control.value);
    console.log('type ', this.control.type);

    this.admin.uploadImages(this.control.type, formData)
      .subscribe(
        (resp: any) => {
          this.showSpinner = false;

          var defaultData = this.control.value;

          console.log('resp ', resp);

          if (this.defaultDataExist() && Array.isArray(this.defaultDataExist())) { // form multiple images
            this.imagesToShow = defaultData;

            resp.forEach((img: any) => {
              console.log('foreach img', img, `${this.URL}/images/${this.control.type}/` + img);

              (this.form.get('formKey') as FormArray)
                .push(new FormControl(`${this.URL}/images/${this.control.type}/` + img));
            });
            console.log('form', this.form);

            return;
          }

          if (this.defaultDataExist()) {
            this.form.get('formKey').setValue(`${this.URL}/images/${this.control.type}/` + resp[0].filename)
            return
          }

          resp.forEach(img => {
            (this.form.get('formKey') as FormArray)
              .push(new FormControl(`${this.URL}/images/${this.control.type}/` + img));
          })
        },
        err => console.log(err))
  }

  showImages(event) {
    Array.from(event.target.files).forEach((file: any) => {
      console.log(file);
      const reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        this.imagesToShow.push(event.target.result);
      });
      reader.readAsDataURL(file);
    });
  }

  removeImage(i: number) {
    this.imagesToShow.splice(i, 1);
    (this.form.get('formKey') as FormArray).removeAt(i);
  }

  trackById(index, item) {
    return item.id;
  }
}
