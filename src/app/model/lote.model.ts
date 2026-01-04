import { Campanha } from './campanha.model';
export class Lote{
    constructor(
        public id: number,
        public dtCadastro: Date,
        public nome: string,
        public campanha: Campanha,
        public dtPrevisaoEnvio: Date,
        public finalizado: boolean,
        public percEnviado: number
    ){}
}