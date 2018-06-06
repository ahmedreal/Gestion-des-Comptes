import { Compte } from "./compte.model";

export class Client {
    constructor(
        public code: number,
        public nom: string,
        public email: string,
        public username: string,
        public password: string,
        public dateCreation: Date,
        public comptes: Compte[]
    ) {
        
    }
}