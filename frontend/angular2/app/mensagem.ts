export class Mensagem {
    tipo:       string;
    statusHtml: number;
    conteudo:   string;
    codigo:     number;

    get type() {
        return this.tipo;
    }
    
    get msg() {
        return this.conteudo;
    }
}