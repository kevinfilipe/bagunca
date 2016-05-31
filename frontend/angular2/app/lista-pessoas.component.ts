import { Component, OnInit } from '@angular/core';
import {PessoaService} from './pessoa.service';

@Component({
  selector: 'lista-pessoas',
  templateUrl: 'app/lista-pessoas.component.html',
  styleUrls: ['app/lista-pessoas.component.css']
})

export class ListaPessoasComponent implements OnInit {  
  public errorMessage;
  public pessoas;
  mode ='Observable';

  constructor (private pessoaService: PessoaService) {}

  ngOnInit() { this.obterPessoas(); }

  obterPessoas() {
    this.pessoaService.getPessoas()
                      .subscribe(
                       pessoas => this.pessoas = pessoas,
                       error   => this.errorMessage = <any>error);
  }

  adicionarPessoa (nome: string) {
    if (!nome) { return; }
    this.pessoaService.adicionarPessoa(nome)
                      .subscribe(
                        pessoa  => this.pessoas.push(pessoa),
                        error  => this.errorMessage = <any>error);
  }
}