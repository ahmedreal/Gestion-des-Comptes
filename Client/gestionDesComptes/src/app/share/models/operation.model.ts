import { Compte} from './compte.model';

export class Operation {

    constructor(
        public numero: number,
        public dateOperation:Date,
        public montant: number,
        public details:string,
        public compte: Compte 
    ){}

}

