import {Component, OnInit}       from '@angular/core';
import {PessoaService}           from './pessoa.service';
import {AdicionaPessoaComponent} from './adiciona-pessoa.component';

@Component({
  selector:    'lista-pessoas',
  templateUrl: 'app/lista-pessoas.component.html',
  styleUrls:   ['app/lista-pessoas.component.css'],
  directives:  [AdicionaPessoaComponent]
})

export class ListaPessoasComponent implements OnInit {  
  public errorMessage;
  public pessoas;

  constructor (private pessoaService: PessoaService) {}

  ngOnInit() { this.obterPessoas(); }

  obterPessoas() {
    this.pessoaService.getPessoas()
                      .subscribe(
                        pessoas => this.pessoas      = pessoas,
                        error   => this.errorMessage = <any>error );
  }
}