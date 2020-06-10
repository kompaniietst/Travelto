import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

  subject = new Subject<any>();

  constructor() { }

  success(message: string) {
    this.subject.next({ type: 'success', text: message })
  }

  error(message: string) {
    this.subject.next({ type: 'error', text: message })
  }

  clear() {
    this.subject.next(null);
  }
}
