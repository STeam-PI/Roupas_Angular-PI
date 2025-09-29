import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dados-pessoais',
  imports: [CommonModule, FormsModule],
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css']
})
export class DadosPessoaisComponent {
  constructor(private router: Router) { }

  estado: 'inicial' | 'email' | 'nome' | 'cpf' | 'data' | 'cep' | 'senha' = 'inicial';
  titulo: string = 'Cadastre-se';

  email: string = '';
  nome: string = '';
  sobrenome: string = '';
  cpf: string = '';
  dataNascimento: string = '';
  cep: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  emailValido: boolean = false;

  transformarContainer(tipo: 'email' | 'nome' | 'cpf' | 'data' | 'cep' | 'senha') {
    this.estado = tipo;
    switch (tipo) {
      case 'email': this.titulo = 'Insira seu email'; break;
      case 'nome': this.titulo = 'Insira seu nome'; break;
      case 'cpf': this.titulo = 'Insira seu CPF'; break;
      case 'data': this.titulo = 'Insira sua data de nascimento'; break;
      case 'cep': this.titulo = 'Insira seu CEP'; break;
      case 'senha': this.titulo = 'Crie sua senha'; break;
    }
  }

  validarEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailValido = regex.test(this.email);
  }

  voltarInicial() {
    this.estado = 'inicial';
    this.titulo = 'Cadastre-se';
  }

  todosCamposPreenchidos(): boolean {
    return (
      this.emailValido &&
      this.nome.trim() !== '' &&
      this.sobrenome.trim() !== '' &&
      this.cpf.trim() !== '' &&
      this.dataNascimento.trim() !== '' &&
      this.cep.trim() !== '' &&
      this.senha !== '' &&
      this.confirmarSenha !== '' &&
      this.senha === this.confirmarSenha
    );
  }

  finalizarCadastro() {
    if (this.todosCamposPreenchidos()) {
      this.router.navigate(['/']);
    } else {
      alert('Por favor, preencha todos os campos corretamente antes de continuar.');
    }
  }
}
