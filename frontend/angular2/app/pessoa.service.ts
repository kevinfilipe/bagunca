import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
 
@Injectable()
export class PessoaService {
  pessoasUrl = 'http://localhost:9000/api/pessoas';

  constructor(private http:Http) { }
  
  getPessoas() {
    return this.http.get(this.pessoasUrl).map((res: Response) => res.json());
  } 
}

