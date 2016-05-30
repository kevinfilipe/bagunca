import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {PessoaService} from './pessoa.service';

@Component({
  selector: 'my-app',
  template: `
    <h1>My First Angular 2 App</h1>
     <h2>Pessoas</h2>
     <ul>
        <li *ngFor="let pessoa of pessoas">
            <span>{{pessoa._id}}</span>
            <span>{{pessoa.nome}}</span>
        </li>
     </ul>
  ` 
})

export class AppComponent {
    public pessoas;

    constructor(
      private http: Http,
      private pessoaService: PessoaService
    ) { }

    getPessoas() {
      this.pessoaService.getPessoas().subscribe(
        data => { this.pessoas = data },
        err => { console.log(err) }
      );
    }

    ngOnInit() {
      this.getPessoas();
    }
}