import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { FormGroup, FormControl } from '@angular/forms';
let LoginComponent = class LoginComponent {
    constructor(dialog, auth, alert) {
        this.dialog = dialog;
        this.auth = auth;
        this.alert = alert;
    }
    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(''),
            password: new FormControl(''),
        });
    }
    openRegModal() {
        this.dialog.closeAll();
        this.dialog.open(RegistrationComponent, {
            panelClass: 'popup',
        });
    }
    onSubmit() {
        this.auth
            .login(this.form.value.email, this.form.value.password)
            .subscribe(_ => this.dialog.closeAll(), err => this.alert.error(err.error));
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map