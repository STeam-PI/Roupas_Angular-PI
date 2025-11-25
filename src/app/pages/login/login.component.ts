import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms'; //

@Component({
  selector: 'app-login', //
  imports: [ReactiveFormsModule], //
  templateUrl: './login.component.html', //
  styleUrl: './login.component.css' //
})
export class LoginComponent {
  title = 'Faça seu login!'; //
  login: string = ''; //
  senha: string = ''; //

  formulario = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    senha: new FormControl('', [Validators.required, Validators.minLength(3),
    Validators.maxLength(200)])
  })

  constructor(private router: Router) { } //

  onSubmit() {
    // A verificação de campos vazios já é feita no getter, mas mantemos a verificação de segurança
    if (this.formulario.get('login')?.value?.trim() !== '' && this.formulario.get('senha')?.value?.trim() !== '') { //
      if (this.formulario.get('login')?.value === 'admin' && this.formulario.get('senha')?.value === '123') { //
        this.router.navigate(['roupas/listagem']); //
      }
      else if (this.formulario.get('login')?.value === 'user' && this.formulario.get('senha')?.value?.trim() !== '') { //
        alert('Login Usuario efetuado com sucesso!'); //
        this.router.navigate(['']); //
      }
      else if (this.formulario.get('login')?.value !== 'admin' && this.formulario.get('login')?.value !== 'user') { //
        alert('Login ou senha incorretos!'); //
      }
    } else {
      alert('Preencha todos os campos!'); //
    }
  }

}
