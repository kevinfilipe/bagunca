import {Component, Input, Output, EventEmitter} from '@angular/core';
import {PessoaService}                          from './pessoa.service';

@Component({
  selector:    'adiciona-pessoa',
  templateUrl: 'app/adiciona-pessoa.component.html',
  styleUrls:   ['app/adiciona-pessoa.component.css']
})

export class AdicionaPessoaComponent {  
  @Input()
  public errorMessage;
  @Input()
  public pessoas;
  @Output()
  novaPessoaSubmetida = new EventEmitter();

  constructor (private pessoaService: PessoaService) {}

  adicionarPessoa (nome: string) {
    if (!nome) { return; }
    this.pessoaService.adicionarPessoa(nome)
                      .subscribe(
                        pessoa  => { if(this.pessoas) { this.pessoas.push(pessoa); this.pessoas.sort(this.sortByName); } },
                        error   => this.errorMessage = <any>error);

    if(this.pessoas) {
      this.novaPessoaSubmetida.emit({
        value: this.pessoas
      });                
    }    
  }

  sortByName(a,b) {
    var x = a.nome.toLowerCase();
    var y = b.nome.toLowerCase();
    
    return x < y ? -1 : x > y ? 1 : 0;
  }
}