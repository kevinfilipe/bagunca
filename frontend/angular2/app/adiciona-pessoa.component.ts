import {Component, Input, Output} from '@angular/core';
import {Pessoa}                   from './pessoa';
import {PessoaService}            from './pessoa.service';
import {Erro}                     from './erro';

@Component({
  selector:    'adiciona-pessoa',
  templateUrl: 'app/adiciona-pessoa.component.html',
  styleUrls:   ['app/adiciona-pessoa.component.css']
})

export class AdicionaPessoaComponent {  
  @Input()
  erro: Erro;
  @Input()
  pessoas: Pessoa[];

  constructor(private pessoaService: PessoaService) {}

  adicionar(nome: string) {
    if (!nome) { return; }

    this.pessoaService
          .adicionar(nome)
          .subscribe(
            resultado => { 
                if (!resultado.mensagem) {
                    if(this.pessoas) {
                       this.pessoas.push(resultado);
                       this.pessoas.sort(this.sortearPorNome);
                    }
                } else {
                    this.erro.status   = resultado.status;
                    this.erro.mensagem = resultado.mensagem;
                    this.erro.codigo   = resultado.codigo;
                }
            },
            erro   => this.erro.mensagem = <any>erro );  
  }

  sortearPorNome(a: Pessoa, b: Pessoa) {
    var x = a.nome.toLowerCase();
    var y = b.nome.toLowerCase();
    
    return x < y ? -1 : x > y ? 1 : 0;
  }
}