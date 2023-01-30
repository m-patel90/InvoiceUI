import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngxtranform',
  pure: true
})
export class NgxtranformPipe implements PipeTransform {

  transform(value: string): string {
    value += "pipe added";
    return value;
  }

}
