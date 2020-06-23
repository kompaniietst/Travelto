import { Pipe, PipeTransform } from '@angular/core';
import { FilterTabsService } from '../core/services/filter-tabs.service';
import { Room } from '../core/models/Room';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(rooms: Room[], priceRange: number[]): unknown {

    if (!priceRange || !rooms) {
      return rooms
    }

    return rooms.filter(v => v.price > priceRange[0] && v.price < priceRange[1]);
  }
}
