import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class formatDatePipe implements PipeTransform {
  transform(date: any, arg: string): unknown {

    if (date && arg == 'date+time')
      return moment(date).format("DD.MM.YYYY HH:mm:ss")

    if (date && arg == 'date')
      return moment(date).format("DD.MM.YYYY")

  }
}
