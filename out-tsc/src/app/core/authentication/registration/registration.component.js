import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { FormGroup, FormControl } from '@angular/forms';
let RegistrationComponent = class RegistrationComponent {
    constructor(dialog, auth, alert) {
        this.dialog = dialog;
        this.auth = auth;
        this.alert = alert;
        this.form = new FormGroup({
            firstname: new FormControl(''),
            phone: new FormControl(''),
            email: new FormControl(''),
            password: new FormControl(''),
        });
    }
    ngOnInit() { }
    openModal() {
        this.dialog.closeAll();
        this.dialog.open(LoginComponent, {
            panelClass: 'popup',
        });
    }
    onSubmit() {
        this.auth
            .register(this.form.value)
            .subscribe(_ => {
            this.alert.success('Thanks for the registration');
            setTimeout(() => {
                this.dialog.closeAll();
                const dialogRef = this.dialog.open(LoginComponent, {
                    panelClass: 'popup',
                });
            }, 1500);
        }, err => this.alert.error(err.error));
    }
};
RegistrationComponent = __decorate([
    Component({
        selector: 'app-registration',
        templateUrl: './registration.component.html',
        styleUrls: ['./registration.component.scss']
    })
], RegistrationComponent);
export { RegistrationComponent };
//# sourceMappingURL=registration.component.js.map