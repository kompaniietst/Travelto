import { Pipe, PipeTransform } from '@angular/core';
import { Room } from '../core/models/Room';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(rooms: Room[], filter: any): Room[] {

    if (!filter || !rooms) {
      return rooms
    }

    if (filter.key == 'price') {
      if (!filter.price) return rooms;
      return rooms.filter(r => r.price > filter.price[0] && r.price < filter.price[1]);
    }

    if (filter.key == 'city') {
      return rooms.filter(r =>
        r.hotel.address.city._id == filter.cityId
      );

    }
  }
}
