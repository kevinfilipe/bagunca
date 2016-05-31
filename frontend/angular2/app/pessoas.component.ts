import {Component, OnInit}       from '@angular/core';
import {PessoaService}           from './pessoa.service';
import {AdicionaPessoaComponent} from './adiciona-pessoa.component';

@Component({
  selector:    'pessoas',
  templateUrl: 'app/pessoas.component.html',
  styleUrls:   ['app/pessoas.component.css'],
  directives:  [AdicionaPessoaComponent]
})

export class PessoasComponent implements OnInit {  
  public errorMessage;
  public pessoas;

  constructor (private pessoaService: PessoaService) {}

  ngOnInit() { this.obterPessoas(); }

  obterPessoas() {
    this.pessoaService.getPessoas()
                      .subscribe(
                        pessoas => { this.pessoas = pessoas; this.pessoas.sort(this.sortByName) },
                        error   => this.errorMessage = <any>error );
  }

  atualizarPessoa(pessoa, event: any) {
    if (!pessoa.nome) { return; }

    this.pessoaService.atualizarPessoa(pessoa)
                      .subscribe(
                        novaPessoa => { this.pessoas = this.pessoas.filter(p => p !== pessoa); this.pessoas.push(novaPessoa); this.pessoas.sort(this.sortByName) },
                        error      => this.errorMessage = <any>error);
  }

  removerPessoa(pessoa, event: any) {
    event.stopPropagation();
    
    this.pessoaService.removerPessoa(pessoa)
                      .subscribe(
                        res    => { this.pessoas = this.pessoas.filter(p => p !== pessoa); this.pessoas.sort(this.sortByName) },
                        error  => this.errorMessage = <any>error );
  }

  sortByName(a,b) {
    var x = a.nome.toLowerCase();
    var y = b.nome.toLowerCase();
    
    return x < y ? -1 : x > y ? 1 : 0;
  }
}