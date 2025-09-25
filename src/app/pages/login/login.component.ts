import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 title = 'Faça seu login!';
login = '';
senha = '';
disabledButton: boolean = true;

constructor(private router: Router) { }

onClickLogin() {
  if (this.login.trim()!== '' && this.senha.trim() !== '') {
if (this.login === 'admin' && this.senha === '123') {
  alert('Login Admin efetuado com sucesso!');
  this.router.navigate(['roupas/cadastro']);
  }
  if (this.login === 'user' && this.senha !== '') {
  alert('Login Usuario efetuado com sucesso!');
  this.router.navigate(['']);
}
if (this.login !== 'admin' && this.login !== 'user') {
  alert('Login ou senha incorretos!');
}
} else {
  alert('Preencha todos os campos!');
}
}

}
