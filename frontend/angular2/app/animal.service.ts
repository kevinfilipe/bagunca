import {Injectable}                              from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import                                           'rxjs/add/operator/map';
import {Animal}                                  from './animal';
 
@Injectable()
export class AnimalService {
  animaisUrl = 'http://localhost:9000/api/animais';

  constructor(private http: Http) { }
  
  consultarTodos() {
    return this.http
                .get(this.animaisUrl)
                .map((res: Response) => res.json());
  } 

  adicionar(nome: string) {
    let body    = JSON.stringify({ nome });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
                .post(this.animaisUrl, body, options)
                .map((res: Response) => res.json());
  }

  atualizar(animal: Animal) {
    let body    = JSON.stringify(animal);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = `${this.animaisUrl}/${animal._id}`;

    return this.http
                .put(url, body, options)
                .map((res: Response) => res.json());
  }

  remover(animal: Animal) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.animaisUrl}/${animal._id}`;

    return this.http
                .delete(url, headers)
                .map((res: Response) => res.json());
  }
}