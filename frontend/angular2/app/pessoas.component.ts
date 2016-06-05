import {Component}               from '@angular/core';
import {Title}                   from '@angular/platform-browser';
import {AlertComponent}          from 'ng2-bootstrap/ng2-bootstrap';
import {Pessoa}                  from './pessoa';
import {PessoaService}           from './pessoa.service';
import {AdicionaPessoaComponent} from './adiciona-pessoa.component';
import {Mensagem}                from './mensagem';

@Component({
  selector:    'pessoas',
  templateUrl: 'app/pessoas.component.html',
  styleUrls:   ['app/pessoas.component.css'],
  directives: [AlertComponent, AdicionaPessoaComponent]
})

export class PessoasComponent {  
  mensagem: Mensagem;
  pessoas: Pessoa[];

  constructor(private pessoaService: PessoaService, private titleService: Title) { }

  ngOnInit() { 
    this.titleService.setTitle('Cadastro de Pessoas');
    this.mensagem = new Mensagem();

    this.consultarTodas(); 
  }

  consultarTodas() {
    this.pessoaService
          .consultarTodas()
          .subscribe(
            pessoas => { 
              this.pessoas = pessoas;
              this.pessoas.sort(this.sortearPorNome) 
            },
            erro => {
              this.mensagem.tipo = 'danger';
              this.mensagem.conteudo = <any>erro;
            });
  }

  remover(pessoa: Pessoa, event: any) {
    event.stopPropagation();
    
    this.pessoaService
          .remover(pessoa)
          .subscribe(
            res  => { 
              this.pessoas = this.pessoas.filter(p => p !== pessoa); 
              this.pessoas.sort(this.sortearPorNome) 
            },
            erro => {
              this.mensagem.tipo = 'danger';
              this.mensagem.conteudo = <any>erro;
            });
  }

  sortearPorNome(a: Pessoa, b: Pessoa) {
    var x = a.nome.toLowerCase();
    var y = b.nome.toLowerCase();
    
    return x < y ? -1 : x > y ? 1 : 0;
  }
}