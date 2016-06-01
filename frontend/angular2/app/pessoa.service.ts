import {Injectable}                              from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import                                           'rxjs/add/operator/map';
 
@Injectable()
export class PessoaService {
  pessoasUrl = 'http://localhost:9000/api/pessoas';

  constructor(private http: Http) { }
  
  consultarTodas() {
    return this.http
                .get(this.pessoasUrl)
                .map((res: Response) => res.json());
  } 

  adicionar(nome: string) {
    let body    = JSON.stringify({ nome });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
                .post(this.pessoasUrl, body, options)
                .map((res: Response) => res.json());
  }

  atualizar(pessoa) {
    let body    = JSON.stringify(pessoa);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = `${this.pessoasUrl}/${pessoa._id}`;

    return this.http
                .put(url, body, options)
                .map((res: Response) => res.json());
  }

  remover(pessoa) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.pessoasUrl}/${pessoa._id}`;

    return this.http
                .delete(url, headers)
                .map((res: Response) => res.json());
  }
}

