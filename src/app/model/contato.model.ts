import { Lote } from './lote.model';
import { ContatoStatus } from './contato-status.model';
export class Contato{
    constructor(
        public id: number,
        public lote: Lote,
        public ddi: number,
        public ddd: number,
        public nome: string,
        public cpfCnpj: string,
        public contrato: string,
        public numeroTelefone: number,
        public contatoStatus: ContatoStatus,
        public dtEnvio: Date,
        public dtSingleCheck: Date,
        public dtDoubleCheck: Date
    ){}
}