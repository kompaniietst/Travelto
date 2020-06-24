import { Pipe, PipeTransform } from '@angular/core';
import { Room } from '../core/models/Room';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(rooms: Room[], filter: any): Room[] {
    // console.log('filter', filter);

    if (!filter || !rooms) {
      return rooms
    }

    if (filter.key == 'price') {
      if (!filter.price) return rooms;
      return rooms.filter(r => r.price > filter.price[0] && r.price < filter.price[1]);
    }

    if (filter.key == 'city') {

      // if (!filter.price) return rooms;
      return rooms.filter(r =>
        r.hotel.address.city._id == filter.cityId
      );



    }

    // return null
  }

  // transform(rooms: Room[], priceFilter: { key: string, price: number[] }): Room[] {

  //   if (!priceFilter?.price || !rooms) {
  //     return rooms
  //   }
  //   console.log('byPrice', priceFilter);

  //   return rooms.filter(v => v.price > priceFilter.price[0] && v.price < priceFilter.price[1]);
  // }
}
