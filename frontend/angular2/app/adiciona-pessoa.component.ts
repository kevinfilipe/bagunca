import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Pessoa}                                 from './pessoa';
import {PessoaService}                          from './pessoa.service';

@Component({
  selector:    'adiciona-pessoa',
  templateUrl: 'app/adiciona-pessoa.component.html',
  styleUrls:   ['app/adiciona-pessoa.component.css']
})

export class AdicionaPessoaComponent {  
  @Input()
  mensagemErro;
  @Input()
  pessoas: Pessoa[];
  @Output()
  novaPessoaSubmetida = new EventEmitter();

  constructor(private pessoaService: PessoaService) {}

  adicionar(nome: string) {
    if (!nome) { return; }

    this.pessoaService
          .adicionar(nome)
          .subscribe(
            pessoa => { if(this.pessoas) { this.pessoas.push(pessoa); this.pessoas.sort(this.sortearPorNome); } },
            erro   => this.mensagemErro = <any>erro );

    if(this.pessoas) {
      this.novaPessoaSubmetida.emit({
        value: this.pessoas
      });                
    }    
  }

  sortearPorNome(a, b) {
    var x = a.nome.toLowerCase();
    var y = b.nome.toLowerCase();
    
    return x < y ? -1 : x > y ? 1 : 0;
  }
}