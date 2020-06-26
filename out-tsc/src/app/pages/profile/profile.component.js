import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProfileComponent = class ProfileComponent {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
        this.notification = 0;
        auth.currUser.subscribe((user) => this.currUser = user);
    }
    ngOnInit() { }
    logout() {
        this.auth.logout();
        this.router.navigate(['/']);
    }
};
ProfileComponent = __decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.scss']
    })
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map