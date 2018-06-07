import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../../share/models/client.model';

@Pipe({
  name: 'filterClient',
  pure: true
})
export class FilterClientPipe implements PipeTransform {

  transform(list: Client[], serach: string): Client[] | null {
    if(!serach.length){
      return list;
    }else{
      return list.filter( l => l.username.toLowerCase().includes(serach.toLowerCase()));
    }
  }

}
