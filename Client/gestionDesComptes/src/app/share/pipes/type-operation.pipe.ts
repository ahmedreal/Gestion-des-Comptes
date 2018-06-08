import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeOperation'
})
export class TypeOperationPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) { 
      case 'VER': { 
         return 'Versement';
      } 
      case 'RET': { 
         return 'Retrait';
      } 
      case 'VEM': { 
        return 'Virement Emis';
      } 
      case 'VRE': { 
        return 'Virement Reçu';
      }
      default: { 
         return 'Autre';
      } 
   } 
  }

}
