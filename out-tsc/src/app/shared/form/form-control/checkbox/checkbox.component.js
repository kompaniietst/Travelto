var CheckboxComponent_1;
import { __decorate } from "tslib";
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormArray, FormControl } from '@angular/forms';
let CheckboxComponent = CheckboxComponent_1 = class CheckboxComponent {
    constructor(filterTabsService) {
        // this.filterTabsService.getRemovedTabID()
        //   .subscribe(x => {
        //     console.log('rmove');
        //     console.log('CHANG', x);
        this.filterTabsService = filterTabsService;
        this.form = new FormGroup({});
        //     this.removeControl(x)
        //   })
        // this.filterTabsService.get().subscribe(x => console.log('GET', x))
    }
    writeValue(obj) { }
    registerOnChange(fn) {
        this.form.get(this.control.key).valueChanges.subscribe(fn);
    }
    registerOnTouched(fn) { }
    ngOnInit() {
        this.defaultData = this.control.value;
        if (this.defaultDataExist()) {
            this.form // if defaultDataExist fill FormArray with FormControls
                .addControl(this.control.key, new FormArray(this.defaultData.map(d => new FormControl(d))));
            this.control.options
                .forEach(o => {
                if (this.defaultData.some(d => o._id == d._id))
                    o.checked = true;
            });
            return;
        }
        this.form
            .addControl(this.control.key, new FormArray([]));
    }
    onCheckboxChange(checked, i, item) {
        checked
            ? this.addControl(item, i)
            : this.removeControl(item._id);
        this.setFilterTabs(checked, item);
    }
    addControl(item, i) {
        this.form.get(this.control.key).push(new FormControl(item));
        this.control.options[i].checked = true;
    }
    removeControl(_id) {
        console.log(this.form);
        var index = this.form.get(this.control.key).controls
            .findIndex(c => c.value._id == _id);
        console.log(index);
        this.control.options[index].checked = false;
        this.form.get(this.control.key).removeAt(index);
    }
    defaultDataExist() {
        return this.control.value ? true : false;
    }
    setFilterTabs(checked, item) {
        checked
            ? this.filterTabsService.set(item)
            : this.filterTabsService.remove(item._id);
    }
    trackById(index, item) {
        return item.id;
    }
};
__decorate([
    Input()
], CheckboxComponent.prototype, "control", void 0);
CheckboxComponent = CheckboxComponent_1 = __decorate([
    Component({
        selector: 'app-checkbox',
        templateUrl: './checkbox.component.html',
        styleUrls: ['./checkbox.component.scss'],
        providers: [{
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => CheckboxComponent_1),
                multi: true
            }]
    })
], CheckboxComponent);
export { CheckboxComponent };
//# sourceMappingURL=checkbox.component.js.map