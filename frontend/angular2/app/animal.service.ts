import {Injectable}                              from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import                                           'rxjs/add/operator/map';
 
@Injectable()
export class AnimalService {
  animaisUrl = 'http://localhost:9000/api/animais';

  constructor(private http: Http) { }
  
  getAnimais() {
    return this.http.get(this.animaisUrl).map((res: Response) => res.json());
  } 

  adicionarAnimal(nome: string) {
    let body    = JSON.stringify({ nome });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.animaisUrl, body, options)
                    .map((res: Response) => res.json());
  }

  atualizarAnimal(animal) {
    let body    = JSON.stringify(animal);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = `${this.animaisUrl}/${animal._id}`;

    return this.http.put(url, body, options)
                    .map((res: Response) => res.json());
  }

  removerAnimal(animal) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.animaisUrl}/${animal._id}`;

    return this.http.delete(url, headers)
                    .map((res: Response) => res.json());
  }
}