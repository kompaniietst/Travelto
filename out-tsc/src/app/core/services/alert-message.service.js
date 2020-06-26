import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let AlertMessageService = class AlertMessageService {
    constructor() {
        this.subject = new Subject();
    }
    success(message) {
        this.subject.next({ type: 'success', text: message });
    }
    error(message) {
        this.subject.next({ type: 'error', text: message });
    }
    clear() {
        this.subject.next(null);
    }
};
AlertMessageService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AlertMessageService);
export { AlertMessageService };
//# sourceMappingURL=alert-message.service.js.map