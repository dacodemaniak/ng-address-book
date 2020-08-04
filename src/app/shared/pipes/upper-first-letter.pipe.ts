import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperFirstLetter'
})
export class UpperFirstLetterPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    console.log(args);
    if (args[0] && args[0].boldize) {
      return '<strong>' + value.charAt(0).toUpperCase() + '</strong>' + value.slice(1);
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
