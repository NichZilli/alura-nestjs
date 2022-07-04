export class NestResponse {
    status: number;
    headers: Object;
    body:  Object;

    constructor(resposta: NestResponse) {
        Object.assign(this, resposta);
        /*O que o método assign faz:
        this.status = resposta.status;
        this.headers = resposta.headers;
        this.body = resposta.body;
        */
    }
}