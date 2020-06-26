var ImagesComponent_1;
import { __decorate } from "tslib";
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormArray, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
let ImagesComponent = ImagesComponent_1 = class ImagesComponent {
    constructor(router, admin) {
        this.router = router;
        this.admin = admin;
        this.form = new FormGroup({});
        this.eventTargetFiles = [];
        this.imagesToShow = [];
        this.URL = environment.apiUrl;
        this.showSpinner = false;
    }
    writeValue(obj) { }
    registerOnChange(fn) {
        this.form.controls.formKey.valueChanges.subscribe(fn);
    }
    registerOnTouched(fn) { }
    ngOnInit() {
        console.log('Deafult', this.control.value);
        var defaultData = this.control.value;
        if (this.defaultDataExist() && Array.isArray(this.defaultDataExist())) { // form multiple images
            this.imagesToShow = defaultData;
            this.form.addControl('formKey', new FormArray([]));
            defaultData.forEach(x => {
                this.form.get('formKey')
                    .push(new FormControl(x));
            });
            return;
        }
        if (this.defaultDataExist()) {
            this.form.addControl('formKey', new FormControl(defaultData)); // form single images
            this.imagesToShow = [defaultData];
            return;
        }
        this.form.addControl('formKey', new FormArray([]));
    }
    defaultDataExist() {
        return this.control.value;
    }
    upload(event) {
        var formData = new FormData();
        this.eventTargetFiles = event.target.files;
        this.showImages(event);
        for (const file of event.target.files) {
            formData.append('files', file);
        }
        this.sendImagesToServer(formData);
    }
    sendImagesToServer(formData) {
        this.showSpinner = true;
        console.log('bef server', this.control.value);
        console.log('type ', this.control.type);
        this.admin.uploadImages(this.control.type, formData)
            .subscribe((resp) => {
            this.showSpinner = false;
            var defaultData = this.control.value;
            console.log('resp ', resp);
            if (this.defaultDataExist() && Array.isArray(this.defaultDataExist())) { // form multiple images
                this.imagesToShow = defaultData;
                resp.forEach((img) => {
                    console.log('foreach img', img, `${this.URL}/images/${this.control.type}/` + img);
                    this.form.get('formKey')
                        .push(new FormControl(`${this.URL}/images/${this.control.type}/` + img));
                });
                console.log('form', this.form);
                return;
            }
            if (this.defaultDataExist()) {
                this.form.get('formKey').setValue(`${this.URL}/images/${this.control.type}/` + resp[0].filename);
                return;
            }
            resp.forEach(img => {
                this.form.get('formKey')
                    .push(new FormControl(`${this.URL}/images/${this.control.type}/` + img));
            });
        }, err => console.log(err));
    }
    showImages(event) {
        Array.from(event.target.files).forEach((file) => {
            console.log(file);
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                this.imagesToShow.push(event.target.result);
            });
            reader.readAsDataURL(file);
        });
    }
    removeImage(i) {
        this.imagesToShow.splice(i, 1);
        this.form.get('formKey').removeAt(i);
    }
    trackById(index, item) {
        return item.id;
    }
};
__decorate([
    Input()
], ImagesComponent.prototype, "control", void 0);
ImagesComponent = ImagesComponent_1 = __decorate([
    Component({
        selector: 'app-images',
        templateUrl: './images.component.html',
        styleUrls: ['./images.component.scss'],
        providers: [{
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => ImagesComponent_1),
                multi: true
            }]
    })
], ImagesComponent);
export { ImagesComponent };
//# sourceMappingURL=images.component.js.map