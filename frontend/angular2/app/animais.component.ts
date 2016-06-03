import {Component}               from '@angular/core';
import {Animal}                  from './animal';
import {AnimalService}           from './animal.service';
import {AdicionaAnimalComponent} from './adiciona-animal.component';
import {Erro}                    from './erro';

@Component({
  selector:    'animais',
  templateUrl: 'app/animais.component.html',
  styleUrls:   ['app/animais.component.css'],
  directives:  [AdicionaAnimalComponent]
})

export class AnimaisComponent {  
  erro: Erro;
  animais: Animal[];

  constructor(private animalService: AnimalService) {}

  ngOnInit() { 
    this.erro = new Erro();

    this.consultarTodos(); 
  }

  consultarTodos() {
    this.animalService
          .consultarTodos()
          .subscribe(
            animais => { this.animais = animais; this.animais.sort(this.sortearPorNome) },
            erro    => this.erro.mensagem = <any>erro );
  }

  atualizar(animal: Animal, event: any) {
    if (!animal.nome) { return; }

    this.animalService
          .atualizar(animal)
          .subscribe(
            novoAnimal => { this.animais = this.animais.filter(p => p !== animal); this.animais.push(novoAnimal); this.animais.sort(this.sortearPorNome) },
            erro       => this.erro.mensagem = <any>erro );
  }

  remover(animal: Animal, event: any) {
    event.stopPropagation();
    
    this.animalService
          .remover(animal)
          .subscribe(
            res  => { this.animais = this.animais.filter(a => a !== animal); this.animais.sort(this.sortearPorNome) },
            erro => this.erro.mensagem = <any>erro );
  }

  sortearPorNome(a: Animal, b: Animal) {
    var x = a.nome.toLowerCase();
    var y = b.nome.toLowerCase();
    
    return x < y ? -1 : x > y ? 1 : 0;
  }
}