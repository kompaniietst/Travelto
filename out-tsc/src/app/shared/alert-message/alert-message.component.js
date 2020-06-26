import { __decorate } from "tslib";
import { Component } from '@angular/core';
class Message {
}
let AlertMessageComponent = class AlertMessageComponent {
    constructor(alertMessageService) {
        this.alertMessageService = alertMessageService;
        this.alertMessageService.subject
            .subscribe(x => {
            this.message = x;
        });
    }
    ngOnInit() {
    }
};
AlertMessageComponent = __decorate([
    Component({
        selector: 'app-alert-message',
        templateUrl: './alert-message.component.html',
        styleUrls: ['./alert-message.component.scss']
    })
], AlertMessageComponent);
export { AlertMessageComponent };
//# sourceMappingURL=alert-message.component.js.map