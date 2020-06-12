import { Pipe, PipeTransform } from '@angular/core';
import { Room } from '../models/Room';
import { Observable } from 'rxjs';

@Pipe({
  name: 'reverse'
})
export class ReversePipe<T> implements PipeTransform {

  transform(array: T[]): T[] {
    return array?.slice().reverse();
  }
}
