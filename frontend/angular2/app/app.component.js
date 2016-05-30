"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var pessoa_service_1 = require('./pessoa.service');
var AppComponent = (function () {
    function AppComponent(http, pessoaService) {
        this.http = http;
        this.pessoaService = pessoaService;
    }
    AppComponent.prototype.getPessoas = function () {
        var _this = this;
        this.pessoaService.getPessoas().subscribe(function (data) { _this.pessoas = data; }, function (err) { console.log(err); });
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getPessoas();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <h1>My First Angular 2 App</h1>\n     <h2>Pessoas</h2>\n     <ul>\n        <li *ngFor=\"let pessoa of pessoas\">\n            <span>{{pessoa._id}}</span>\n            <span>{{pessoa.nome}}</span>\n        </li>\n     </ul>\n  "
        }), 
        __metadata('design:paramtypes', [http_1.Http, pessoa_service_1.PessoaService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map