import {Component}             from '@angular/core';
import {PessoasComponent} from './pessoas.component';

@Component({
  selector:   'app',
  template:   '<pessoas></pessoas>',
  directives: [PessoasComponent]
})

export class AppComponent {}