import {Component, Input, Output, EventEmitter} from '@angular/core';
import {AnimalService}                          from './animal.service';

@Component({
  selector:    'adiciona-animal',
  templateUrl: 'app/adiciona-animal.component.html',
  styleUrls:   ['app/adiciona-animal.component.css']
})

export class AdicionaAnimalComponent {  
  @Input()
  public errorMessage;
  @Input()
  public animais;
  @Output()
  novoAnimalSubmetido = new EventEmitter();

  constructor (private animalService: AnimalService) {}

  adicionarAnimal (nome: string) {
    if (!nome) { return; }
    this.animalService.adicionarAnimal(nome)
                      .subscribe(
                        animal  => { if(this.animais) { this.animais.push(animal); this.animais.sort(this.sortByName); } },
                        error   => this.errorMessage = <any>error);

    if(this.animais) {
      this.novoAnimalSubmetido.emit({
        value: this.animais
      });                
    }    
  }

  sortByName(a,b) {
    var x = a.nome.toLowerCase();
    var y = b.nome.toLowerCase();
    
    return x < y ? -1 : x > y ? 1 : 0;
  }
}