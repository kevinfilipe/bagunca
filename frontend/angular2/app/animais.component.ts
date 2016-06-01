import {Component, OnInit}       from '@angular/core';
import {AnimalService}           from './animal.service';
import {AdicionaAnimalComponent} from './adiciona-animal.component';

@Component({
  selector:    'animais',
  templateUrl: 'app/animais.component.html',
  styleUrls:   ['app/animais.component.css'],
  directives:  [AdicionaAnimalComponent]
})

export class AnimaisComponent implements OnInit {  
  public errorMessage;
  public animais;

  constructor (private animalService: AnimalService) {}

  ngOnInit() { this.obterAnimais(); }

  obterAnimais() {
    this.animalService.getAnimais()
                      .subscribe(
                        animais => { this.animais = animais; this.animais.sort(this.sortByName) },
                        error   => this.errorMessage = <any>error );
  }

  atualizarAnimal(animal, event: any) {
    if (!animal.nome) { return; }

    this.animalService.atualizarAnimal(animal)
                      .subscribe(
                        novoAnimal => { this.animais = this.animais.filter(p => p !== animal); this.animais.push(novoAnimal); this.animais.sort(this.sortByName) },
                        error      => this.errorMessage = <any>error);
  }

  removerAnimal(animal, event: any) {
    event.stopPropagation();
    
    this.animalService.removerAnimal(animal)
                      .subscribe(
                        res    => { this.animais = this.animais.filter(a => a !== animal); this.animais.sort(this.sortByName) },
                        error  => this.errorMessage = <any>error );
  }

  sortByName(a,b) {
    var x = a.nome.toLowerCase();
    var y = b.nome.toLowerCase();
    
    return x < y ? -1 : x > y ? 1 : 0;
  }
}