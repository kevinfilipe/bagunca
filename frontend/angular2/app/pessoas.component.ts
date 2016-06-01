import {Component}               from '@angular/core';
import {Pessoa}                  from './pessoa';
import {PessoaService}           from './pessoa.service';
import {AdicionaPessoaComponent} from './adiciona-pessoa.component';

@Component({
  selector:    'pessoas',
  templateUrl: 'app/pessoas.component.html',
  styleUrls:   ['app/pessoas.component.css'],
  directives:  [AdicionaPessoaComponent]
})

export class PessoasComponent {  
  mensagemErro;
  pessoas: Pessoa[];

  constructor (private pessoaService: PessoaService) {}

  ngOnInit() { this.consultarTodas(); }

  consultarTodas() {
    this.pessoaService.consultarTodas()
                      .subscribe(
                        pessoas => { this.pessoas = pessoas; this.pessoas.sort(this.sortearPorNome) },
                        erro    => this.mensagemErro = <any>erro );
  }

  atualizar(pessoa: Pessoa, event: any) {
    if (!pessoa.nome) { return; }

    this.pessoaService
          .atualizar(pessoa: Pessoa)
          .subscribe(
            novaPessoa => { this.pessoas = this.pessoas.filter(p => p !== pessoa); this.pessoas.push(novaPessoa); this.pessoas.sort(this.sortearPorNome) },
            erro       => this.mensagemErro = <any>erro );
  }

  remover(pessoa: Pessoa, event: any) {
    event.stopPropagation();
    
    this.pessoaService
          .remover(pessoa)
          .subscribe(
            res  => { this.pessoas = this.pessoas.filter(p => p !== pessoa); this.pessoas.sort(this.sortearPorNome) },
            erro => this.mensagemErro = <any>erro );
  }

  sortearPorNome(a, b) {
    var x = a.nome.toLowerCase();
    var y = b.nome.toLowerCase();
    
    return x < y ? -1 : x > y ? 1 : 0;
  }
}