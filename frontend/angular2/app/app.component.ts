import {Component}                                        from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {PessoasComponent}                                 from './pessoas.component';
import {PessoaService}                                    from './pessoa.service';

@Component({
  selector:    'app',
  templateUrl: 'app/app.component.html',
  styleUrls:   ['app/app.component.css'],
  directives:  [ROUTER_DIRECTIVES],
  providers:   [
    ROUTER_PROVIDERS,
    PessoaService
  ]
})

@RouteConfig([
  {
    path: '/pessoas',
    name: 'Pessoas',
    component: PessoasComponent
  }
])

export class AppComponent {}