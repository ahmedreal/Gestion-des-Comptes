import { Client } from "./client.model";
import { Operation } from "./operation.model";

export class Compte {

    constructor(
        public codeCompte: string,
        public dateCreation: Date,
        public solde: number,
        public client: Client,
        public operations: Operation[]
    ) {}
}