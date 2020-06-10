import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Control } from 'src/app/core/models/Control';

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
    array: new FormArray([])
  })

  selectedFiles: File[] = [];

  get array() {
    return this.form.get('array') as FormArray;
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.form.controls.array.valueChanges.subscribe(fn)
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit(): void { }


  imgs = [];

  processFile(event) {

    this.selectedFiles = event.target.files;

    const formData: FormData = new FormData();

    for (const img of this.selectedFiles) {
      formData.append('files', img);
    }

    this.http.post('http://localhost:4000/imgs', formData)
      .subscribe(
        (resp_images: any) => {
          console.log('resp_images ', resp_images);
          this.imgs = resp_images;
          resp_images.forEach(img => (this.form.get('array') as FormArray).push(new FormControl('http://localhost:4000/images/' + img.filename)));
        },
        error => {
          console.log(error);
        }
      )
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

  removeImage(i: number) {
    this.selectedFiles.splice(i, 1);
    (this.form.get('array') as FormArray).removeAt(i);
  }

  trackById(index, item) {
    return item.id;
  }
}
