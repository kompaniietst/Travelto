import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {

  transform(items: any, limit: number): unknown {
    if (!items) return;
    return items.slice(0, limit);
  }

}
