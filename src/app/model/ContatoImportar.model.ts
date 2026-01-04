import { Lote } from './lote.model';
export class ContatoImportar{
    constructor(
        public id: number,
        public lote: Lote,
        public caminho: String,
        public percConcluido: number
    ){}
}