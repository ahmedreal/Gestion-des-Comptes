import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCodeCourant',
  pure: true
})
export class FilterCodeCourantPipe implements PipeTransform {

  transform(list: string[], codeCourant: string): string[] | null {
      return list.filter( code => code!=codeCourant );
  }

}
