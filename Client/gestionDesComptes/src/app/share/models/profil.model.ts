
export class Profil {
    constructor(
        public code: number,
        public nom: string,
        public email: string,
        public username: string,
        public password: string,
        public dateCreation: Date,
        public roles: Array<string>,
        public discriminatorValue:string
        ) {
        
    }
}