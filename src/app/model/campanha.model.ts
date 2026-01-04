import { Mensagem } from './mensagem.model';
import { Empresa } from './empresa.model';
export class Campanha{
    constructor(
        public id: number,
        public nome: string,
        public descricao: string,
        public empresa: Empresa,
        public mensagem: Mensagem
    ){}
}