import {Component, ViewContainerRef}                      from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {PessoasComponent}                                 from './pessoas.component';
import {PessoaService}                                    from './pessoa.service';
import {AnimaisComponent}                                 from './animais.component';
import {AnimalService}                                    from './animal.service';

@Component({
  selector:    'app',
  templateUrl: 'app/app.component.html',
  styleUrls:   ['app/app.component.css'],
  directives:  [ROUTER_DIRECTIVES],
  providers:   [
    ROUTER_PROVIDERS,
    PessoaService,
    AnimalService
  ]
})

@RouteConfig([
  {
    path: '/pessoas',
    name: 'Pessoas',
    component: PessoasComponent
  },
  {
    path: '/animais',
    name: 'Animais',
    component: AnimaisComponent
  }
])

export class AppComponent {
  viewContainerRef: ViewContainerRef;

  public constructor(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  pessoasChecked: boolean;
  animaisChecked: boolean;

  ativarAbaPessoas() {
    this.animaisChecked = false;
    this.pessoasChecked = !this.pessoasChecked;
  }

  ativarAbaAnimais() {
    this.pessoasChecked = false;
    this.animaisChecked = !this.animaisChecked;
  }
}