import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SizeDetectorService {

  get onResize$(): Observable<any> {
    return this.resizeSubject.asObservable()
      .pipe(distinctUntilChanged());
  }

  private resizeSubject: Subject<any>;

  constructor() {
    this.resizeSubject = new Subject();
  }

  onResize(size: any) {
    this.resizeSubject.next(size);
  }
}
