"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var app_component_1 = require('./app.component');
var pessoa_service_1 = require('./pessoa.service');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    pessoa_service_1.PessoaService
]);
//# sourceMappingURL=main.js.map