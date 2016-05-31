import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {PessoaService} from './pessoa.service';
import {ListaPessoasComponent} from './lista-pessoas.component';

@Component({
  selector: 'my-app',
  template: '<lista-pessoas></lista-pessoas>',
  directives: [ListaPessoasComponent]
})

export class AppComponent {
    constructor(
      private http: Http,
      private pessoaService: PessoaService
    ) { }
}