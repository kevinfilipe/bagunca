import {Component, Input, Output} from '@angular/core';
import {Animal}                   from './animal';
import {AnimalService}            from './animal.service';
import {Erro}                     from './erro';

@Component({
  selector:    'adiciona-animal',
  templateUrl: 'app/adiciona-animal.component.html',
  styleUrls:   ['app/adiciona-animal.component.css']
})

export class AdicionaAnimalComponent {  
  @Input()
  erro: Erro;
  @Input()
  animais: Animal[];

  constructor(private animalService: AnimalService) {}

  adicionar(nome: string) {
    if (!nome) { return; }

    this.animalService
          .adicionar(nome)
          .subscribe(
            resultado => {
                if (!resultado.mensagem) {
                    if(this.animais) {
                       this.animais.push(resultado);
                       this.animais.sort(this.sortearPorNome);
                    }
                } else {
                    this.erro.status   = resultado.status;
                    this.erro.mensagem = resultado.mensagem;
                    this.erro.codigo   = resultado.codigo;
                }
            },
            erro   => this.erro.mensagem = <any>erro );  
  }

  sortearPorNome(a: Animal, b: Animal) {
    var x = a.nome.toLowerCase();
    var y = b.nome.toLowerCase();
    
    return x < y ? -1 : x > y ? 1 : 0;
  }
}