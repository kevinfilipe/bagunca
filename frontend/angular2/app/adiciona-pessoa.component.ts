import {Component, EventEmitter, Input, Output, ViewChild}                                from '@angular/core';
import {CORE_DIRECTIVES}                                                                  from '@angular/common';
import {NgForm}                                                                           from '@angular/common';
import * as moment                                                                        from 'moment';
import {AlertComponent, BS_VIEW_PROVIDERS, ModalDirective, MODAL_DIRECTVES, ModalOptions} from 'ng2-bootstrap/ng2-bootstrap';
import {Pessoa}                                                                           from './pessoa';
import {PessoaService}                                                                    from './pessoa.service';
import {Mensagem}                                                                         from './mensagem';

@Component({
  selector:      'adiciona-pessoa',
  templateUrl:   'app/adiciona-pessoa.component.html',
  styleUrls:     ['app/adiciona-pessoa.component.css'],
  directives:    [AlertComponent, CORE_DIRECTIVES, MODAL_DIRECTVES],
  viewProviders: [BS_VIEW_PROVIDERS]
})

export class AdicionaPessoaComponent {
 
  @Input()
  mensagem: Mensagem;
  mensagemModal: Mensagem;
  
  @Input()
  pessoas: Pessoa[];

  @ViewChild('modalPessoa')
  modalPessoa;

  pessoa: Pessoa;
  formularioAtivo: boolean;
  editandoPessoa: boolean;
  fecharModal: boolean;

  constructor(private pessoaService: PessoaService) { }

  definirNovo() {
      this.mensagemModal = new Mensagem();
      this.pessoa = new Pessoa();
      this.formularioAtivo = false;
      this.editandoPessoa = false;
      this.fecharModal = false;

      setTimeout(() => this.formularioAtivo = true, 0);

      this.modalPessoa.show();
  }

  definirEditar(pessoa: Pessoa, event: any) {
      this.mensagemModal = new Mensagem();
      this.pessoa = JSON.parse(JSON.stringify(pessoa));
      this.formularioAtivo = true;
      this.editandoPessoa = true;
      this.fecharModal = false;

      setTimeout(() => this.formularioAtivo = true, 0);

      this.modalPessoa.show();
  }

  salvar() {
    if(this.editandoPessoa) {
        this.atualizar();
    } else {
        this.adicionar();
    }
  }

  adicionar() {
      this.pessoaService
            .adicionar(this.pessoa)
            .subscribe(
              resultado => { 
                if (!resultado.mensagem) {
                  if(this.pessoas) {
                    this.pessoas.push(resultado);
                    this.pessoas.sort(this.sortearPorNome);
                  }

                  if(this.fecharModal) {
                    this.modalPessoa.hide();
                    this.mensagem.tipo = 'success';
                    this.mensagem.conteudo = 'Pessoa inserida com sucesso!';
                  } else {
                    this.pessoa = new Pessoa();
                    this.formularioAtivo = false;
                    this.editandoPessoa = false;
                    this.fecharModal = false;

                    setTimeout(() => this.formularioAtivo = true, 0);

                    this.mensagemModal.tipo = 'success';
                    this.mensagemModal.conteudo = 'Pessoa inserida com sucesso!';
                  }
                } else {

                    this.mensagemModal.tipo = null;
                    this.mensagemModal.conteudo = null; 

                    setTimeout(() => {
                    }, 0);

                    this.mensagemModal.tipo = 'danger';
                    this.mensagemModal.statusHtml = resultado.status;
                    this.mensagemModal.conteudo = resultado.mensagem;
                    this.mensagemModal.codigo = resultado.codigo;
                    this.fecharModal = false;
                } 
              },
              erro => {
                this.mensagemModal.tipo = 'danger';
                this.mensagemModal.conteudo = <any>erro
                this.fecharModal = false;
              } );  
  }

  atualizar() {
      this.pessoaService
            .atualizar(this.pessoa)
            .subscribe(
              resultado => { 
                if (!resultado.mensagem) {
                    for (var i = 0; i < this.pessoas.length; i++) {
                        if(this.pessoas[i]._id === this.pessoa._id) {
                            this.pessoas[i].nome = this.pessoa.nome;
                            this.pessoas[i].email = this.pessoa.email;

                            break;
                        }
                    }

                    this.pessoas.sort(this.sortearPorNome);

                    if (this.fecharModal) {
                      this.modalPessoa.hide();
                      this.mensagem.tipo = 'success';
                      this.mensagem.conteudo = 'Pessoa atualizada com sucesso!';
                    } else {
                        this.formularioAtivo = false;
                        
                        setTimeout(() => this.formularioAtivo = true, 0);

                        this.mensagemModal.tipo = 'success';
                        this.mensagemModal.conteudo = 'Pessoa atualizada com sucesso!';
                    }
                } else {
                    this.mensagem.tipo = 'danger';
                    this.mensagem.statusHtml = resultado.status;
                    this.mensagem.conteudo = resultado.mensagem;
                    this.mensagem.codigo = resultado.codigo;
                    this.fecharModal = false;
                }
              },
              erro => {
                this.mensagemModal.tipo = 'danger';
                this.mensagemModal.conteudo = <any>erro;
                this.fecharModal = false;
              } );
  }

  alertaFechado() {
    this.mensagemModal.codigo = null;
    this.mensagemModal.statusHtml = null;
    this.mensagemModal.conteudo = null;
    this.mensagemModal.tipo = null;
  }

  sortearPorNome(a: Pessoa, b: Pessoa) {
    var x = a.nome.toLowerCase();
    var y = b.nome.toLowerCase();
    
    return x < y ? -1 : x > y ? 1 : 0;
  }
}