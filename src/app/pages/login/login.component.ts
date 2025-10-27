import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; //

@Component({
  selector: 'app-login', //
  imports: [FormsModule], //
  templateUrl: './login.component.html', //
  styleUrl: './login.component.css' //
})
export class LoginComponent {
  title = 'Faça seu login!'; //
  login: string = ''; //
  senha: string = ''; //
  
  // CORREÇÃO: A propriedade disabledButton deve ser uma função de getter
  get disabledButton(): boolean {
    // Retorna true (desabilitado) se o login OU a senha estiverem vazios
    return this.login.trim() === '' || this.senha.trim() === '';
  }

  constructor(private router: Router) { } //

  onClickLogin() {
    // A verificação de campos vazios já é feita no getter, mas mantemos a verificação de segurança
    if (this.login.trim() !== '' && this.senha.trim() !== '') { //
      if (this.login === 'admin' && this.senha === '123') { //
        this.router.navigate(['roupas/listagem']); //
      }
      else if (this.login === 'user' && this.senha !== '') { //
        alert('Login Usuario efetuado com sucesso!'); //
        this.router.navigate(['']); //
      }
      else if (this.login !== 'admin' && this.login !== 'user') { //
        alert('Login ou senha incorretos!'); //
      }
    } else {
      alert('Preencha todos os campos!'); //
    }
  }

}