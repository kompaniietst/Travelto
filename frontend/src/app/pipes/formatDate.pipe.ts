import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class formatDatePipe implements PipeTransform {
  transform(date: any): unknown {
    return moment(date).format("DD.MM.YYYY")
  }
}
