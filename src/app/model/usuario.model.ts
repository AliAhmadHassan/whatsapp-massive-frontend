import { Empresa } from './empresa.model';
export class Usuario{
    constructor(
        public id: number,
        public nome: string,
        public username: string,
        public email: string,
        public password: string,
        public profile: string,
        public empresa:Empresa
    ){}
}