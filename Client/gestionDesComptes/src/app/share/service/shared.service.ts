import { Injectable } from '@angular/core';


@Injectable()
export class SharedService {
    
    constructor() { }

    isPasswordConfirmed(password:string, passwordConf:string):string{
        let result:string;
        if(password!= passwordConf){
            result = "Les deux mots de passe sont différents!";
        }
        return result;
    }
}    