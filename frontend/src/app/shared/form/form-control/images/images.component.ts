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

  form: FormGroup = new FormGroup({
    // formKey: new FormArray([])
  })

  selectedFiles: File[] = [];
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

  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit(): void {
    var defaultData = this.control.value;
    console.log('GGGGG', defaultData);

    if (defaultData && Array.isArray(defaultData)) { // form multiple images
      this.imagesToShow = defaultData;

      this.form.addControl('formKey', new FormArray([]))

      defaultData.forEach(x => {
        (this.form.get('formKey') as FormArray)
          .push(new FormControl(x))
      })
      return;
    }

    if (defaultData) {
      this.form.addControl('formKey', new FormControl(defaultData)); // form single images

      this.imagesToShow = [defaultData];
      return
    }

    this.form.addControl('formKey', new FormArray([]))
  }

  upload(event) {
    var formData = new FormData();
    var selectedFiles = event.target.files;

    this.showImages(event);

    for (const file of event.target.files) {
      formData.append('files', file)
    }

    console.log('this.control.type', this.control.type);

    this.showSpinner = true;
    this.admin.uploadImages(this.control.type, formData)
      .subscribe(
        (x: any) => {
          console.log('load', x);
          this.showSpinner = false;

          var defaultData = this.control.value;
          console.log('DEFAULT', this.control.value);


          if (defaultData && Array.isArray(defaultData)) { // form multiple images
            this.imagesToShow = defaultData;

            x.forEach((img: any) => {
              (this.form.get('formKey') as FormArray)
                .push(new FormControl(`${this.URL}/images/${this.control.type}/` + img));
            });
            return;
          }

          if (defaultData) {
            console.log('FORM', this.form, x);
            this.form.get('formKey').setValue(`${this.URL}/images/${this.control.type}/` + x[0].filename)
            return
          }


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

  cleanControl() {
    this.imagesToShow = [];
  }

  removeImage(i: number) {
    this.imagesToShow.splice(i, 1);
    (this.form.get('formKey') as FormArray).removeAt(i);
  }

  trackById(index, item) {
    return item.id;
  }
}
