import {Component}               from '@angular/core';
import {Pessoa}                  from './pessoa';
import {PessoaService}           from './pessoa.service';
import {AdicionaPessoaComponent} from './adiciona-pessoa.component';
import {Erro}                    from './erro';

@Component({
  selector:    'pessoas',
  templateUrl: 'app/pessoas.component.html',
  styleUrls:   ['app/pessoas.component.css'],
  directives:  [AdicionaPessoaComponent]
})

export class PessoasComponent {  
  erro: Erro;
  pessoas: Pessoa[];

  constructor (private pessoaService: PessoaService) {}

  ngOnInit() { 
    this.erro = new Erro();

    this.consultarTodas(); 
  }

  consultarTodas() {
    this.pessoaService
          .consultarTodas()
          .subscribe(
            pessoas => { this.pessoas = pessoas; this.pessoas.sort(this.sortearPorNome) },
            erro    => this.erro.mensagem = <any>erro);
  }

  atualizar(pessoa: Pessoa, event: any) {
      if (!pessoa.nome) { return; }

      this.pessoaService
          .atualizar(pessoa)
          .subscribe(
          novaPessoa => { this.pessoas = this.pessoas.filter(p => p !== pessoa); this.pessoas.push(novaPessoa); this.pessoas.sort(this.sortearPorNome) },
          erro       => this.erro.mensagem = <any>erro );
  }

  remover(pessoa: Pessoa, event: any) {
    event.stopPropagation();
    
    this.pessoaService
          .remover(pessoa)
          .subscribe(
            res  => { this.pessoas = this.pessoas.filter(p => p !== pessoa); this.pessoas.sort(this.sortearPorNome) },
            erro => this.erro.mensagem = <any>erro);
  }

  sortearPorNome(a: Pessoa, b: Pessoa) {
    var x = a.nome.toLowerCase();
    var y = b.nome.toLowerCase();
    
    return x < y ? -1 : x > y ? 1 : 0;
  }
}