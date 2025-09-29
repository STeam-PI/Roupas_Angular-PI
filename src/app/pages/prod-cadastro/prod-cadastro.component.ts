import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prod-cadastro',
  imports: [],
  templateUrl: './prod-cadastro.component.html',
  styleUrl: './prod-cadastro.component.css'
})
export class ProdCadastroComponent {
  constructor(private router: Router) { }

  cadastrarProduto() {
    this.router.navigate(['roupas/cadastro']);
  }
}
