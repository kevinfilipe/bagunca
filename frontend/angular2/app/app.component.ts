import {Component}             from '@angular/core';
import {ListaPessoasComponent} from './lista-pessoas.component';

@Component({
  selector:   'my-app',
  template:   '<lista-pessoas></lista-pessoas>',
  directives: [ListaPessoasComponent]
})

export class AppComponent {}