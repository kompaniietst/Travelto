import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../core/models/Order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

  transform(orders: Order[], status: string): Order[] {
    if (!orders)
      return []
    return orders.filter(o => o.status == status)
  }
}
