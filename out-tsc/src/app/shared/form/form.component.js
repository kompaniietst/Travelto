import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GenerateFormStructureService } from 'src/app/core/services/generate-form-structure.service';
import { CheckboxComponent } from './form-control/checkbox/checkbox.component';
let FormComponent = class FormComponent {
    constructor(generateForm, filterTabsService) {
        this.generateForm = generateForm;
        this.filterTabsService = filterTabsService;
        this.valueChange = new EventEmitter();
    }
    ngOnInit() {
        if (this.controls$)
            this.filterTabsService.getRemovedTabID()
                .subscribe(x => {
                console.log('rmove');
                console.log('CHANG', x);
                console.log('FORM', this.form);
                // console.log(this.form);
                // var index = (this.form.get('amenities') as FormArray).controls
                //   .findIndex(c => c.value._id == x);
                // console.log(index);
                console.log(this.form.get('amenities').value);
                // this.checkboxComponentRef.removeControl(x)
            });
        // this.filterTabsService.getRemovedTabID().subscribe(x => console.log('GET', x))
        this.controls$.subscribe(x => console.log(x));
        this.form = this.generateForm.defineStructure(this.controls$);
        if (this.defaultData) {
            for (const key of Object.keys(this.defaultData)) {
                var value = this.defaultData[key];
                if (key == '_id' || key == 'feedbacks' || key == '__v')
                    continue;
                // console.log('key', key, this.form.get(key));
                this.form.get(key).setValue(value);
            }
        }
    }
    onSubmit() {
        this.valueChange.emit(this.form.value);
        console.log(this.form.value);
        // this.resetForm();
    }
    // resetForm() {
    //   this.form = this.generateForm.defineStructure(this.controls$);
    //   this.imagesComponentRef.cleanControl();
    //   this.checkboxComponentRef.cleanControl();
    //   this.advancedInputComponentRef.dropdownComponentRef.cleanControl();
    // }
    trackById(index, item) {
        return item.id;
    }
};
__decorate([
    Input()
], FormComponent.prototype, "controls$", void 0);
__decorate([
    Input()
], FormComponent.prototype, "defaultData", void 0);
__decorate([
    Input()
], FormComponent.prototype, "buttonName", void 0);
__decorate([
    Input()
], FormComponent.prototype, "showSpinner", void 0);
__decorate([
    Input()
], FormComponent.prototype, "headerTemplate", void 0);
__decorate([
    Input()
], FormComponent.prototype, "contentTemplate", void 0);
__decorate([
    Input()
], FormComponent.prototype, "footerTemplate", void 0);
__decorate([
    Output()
], FormComponent.prototype, "valueChange", void 0);
__decorate([
    ViewChild(CheckboxComponent)
], FormComponent.prototype, "checkboxComponentRef", void 0);
FormComponent = __decorate([
    Component({
        selector: 'app-form',
        templateUrl: './form.component.html',
        styleUrls: ['./form.component.scss'],
        providers: [GenerateFormStructureService]
    })
], FormComponent);
export { FormComponent };
//# sourceMappingURL=form.component.js.map