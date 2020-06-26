import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { LoginComponent } from 'src/app/core/authentication/login/login.component';
let ProfileTriggerComponent = class ProfileTriggerComponent {
    constructor(dialog, router, auth) {
        this.dialog = dialog;
        this.router = router;
        this.auth = auth;
        this.notification = 0;
        this.auth.currUser.subscribe((user) => {
            this.currUser = user;
        });
        // this.bookingService.bookings.subscribe(x =>
        //   this.notification = x.filter(f => f.state == 'active').length
        // );
    }
    ngOnInit() {
    }
    openDialog() {
        const dialogRef = this.dialog.open(LoginComponent, {
            panelClass: 'popup',
        });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed');
        //   this.animal = result;
        // });
    }
    logout() {
        this.auth.logout();
        this.router.navigate(['/']);
    }
};
ProfileTriggerComponent = __decorate([
    Component({
        selector: 'app-profile-trigger',
        templateUrl: './profile-trigger.component.html',
        styleUrls: ['./profile-trigger.component.scss']
    })
], ProfileTriggerComponent);
export { ProfileTriggerComponent };
//# sourceMappingURL=profile-trigger.component.js.map