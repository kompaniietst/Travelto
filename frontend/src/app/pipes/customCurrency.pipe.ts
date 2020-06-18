import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number): unknown {
    if (value)
      return value.toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

}
