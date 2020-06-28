import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../core/models/Order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

  transform(orders$: Observable<Order[]>, status: string): Observable<Order[]> {
    return orders$
      .pipe(
        map((o: Order[]) => {
          return o.filter(o => o.status == status)
        }))
  }
}
