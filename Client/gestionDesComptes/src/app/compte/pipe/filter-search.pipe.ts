import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch',
  pure: true
})
export class FilterSearchPipe implements PipeTransform {

  transform(list: string[], serach: string): string[] | null {
    if(!serach.length){
      return list;
    }else{
      return list.filter( l => l.toLowerCase().includes(serach.toLowerCase()));
    }
  }

}
