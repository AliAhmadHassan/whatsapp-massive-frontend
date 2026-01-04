import { TipoArquivo } from "./tipo-arquivo.model";

export class Mensagem{
    constructor(
        public id: number,
        public texto: string,
        public caminhoArquivo: string,
        public tipoArquivo: TipoArquivo
    ){}
}