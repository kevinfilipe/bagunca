import {bootstrap}      from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {AppComponent}   from './app.component';
import {PessoaService}  from './pessoa.service';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    PessoaService
]);