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
    // array: new FormArray([])
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
    this.form.controls.array.valueChanges.subscribe(fn)
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit(): void {
    var defaultData = this.control.value;
    console.log('GGGGG',defaultData);
    this.form.addControl('array', new FormArray([]))

    if (defaultData && Array.isArray(defaultData)) { // form multiple images
      this.imagesToShow = defaultData;


      defaultData.forEach(x => {
        (this.form.get('array') as FormArray)
          .push(new FormControl(x))
      })
      return;
    }

    if (defaultData) {
      // this.form.addControl('array', new FormControl(defaultData))  // form single images
      (this.form.get('array') as FormArray)
          .push(new FormControl(defaultData))
      this.imagesToShow = [defaultData];
      return
    }

    this.form.addControl('array', new FormArray([]))
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
          x.forEach((img: any) => {
            (this.form.get('array') as FormArray)
              .push(new FormControl(`${this.URL}/images/${this.control.type}/` + img));
          });
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

  onDrop(event: CdkDragDrop<string[]>) {
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data,
    //     event.previousIndex,
    //     event.currentIndex);
    // } else {
    //   transferArrayItem(event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex, event.currentIndex);
    // }
  }

  cleanControl() {
    this.imagesToShow = [];
  }

  removeImage(i: number) {
    this.imagesToShow.splice(i, 1);
    (this.form.get('array') as FormArray).removeAt(i);
  }

  trackById(index, item) {
    return item.id;
  }
}
