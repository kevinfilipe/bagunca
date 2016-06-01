import {Component, Input, Output, EventEmitter} from '@angular/core';
import {AnimalService}                          from './animal.service';
import {Animal}                                 from './animal';

@Component({
  selector:    'adiciona-animal',
  templateUrl: 'app/adiciona-animal.component.html',
  styleUrls:   ['app/adiciona-animal.component.css']
})

export class AdicionaAnimalComponent {  
  @Input()
  mensagemErro;
  @Input()
  animais: Animal[];
  @Output()
  novoAnimalSubmetido = new EventEmitter();

  constructor(private animalService: AnimalService) {}

  adicionar(nome: string) {
    if (!nome) { return; }
    this.animalService
          .adicionar(nome)
          .subscribe(
            animal  => { if(this.animais) { this.animais.push(animal); this.animais.sort(this.sortearPorNome); } },
            erro    => this.mensagemErro = <any>erro );

    if(this.animais) {
      this.novoAnimalSubmetido.emit({
        value: this.animais
      });                
    }    
  }

  sortearPorNome(a, b) {
    var x = a.nome.toLowerCase();
    var y = b.nome.toLowerCase();
    
    return x < y ? -1 : x > y ? 1 : 0;
  }
}