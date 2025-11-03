import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProdutosService } from '../../core/services/produtos.service';
import { Produtos } from '../../core/types/types';

// Array de referência para garantir a ordem correta
const TAMANHOS_ORDEM = ['P', 'M', 'G', 'GG']; 

@Component({
  selector: 'app-prod-cadastro',
  imports: [CommonModule, DecimalPipe],
  standalone: true,
  templateUrl: './prod-cadastro.component.html',
  styleUrl: './prod-cadastro.component.css'
})
export class ProdCadastroComponent implements OnInit {
  listaProdutos: Produtos[] = [];

  constructor(
    private router: Router,
    private service: ProdutosService
  ) { }

  ngOnInit(): void {
    this.service.listar().subscribe((produtos) => {
      this.listaProdutos = produtos;
    });
  }

  formatarTamanhos(tamanho: string | string[]): string {
    if (!tamanho) {
      return '';
    }

    // 1. Converte para array (se for string separada por vírgula da API)
    const tamanhosArray = Array.isArray(tamanho) ? tamanho : (tamanho as string).split(',');

    // 2. Filtra e ordena de acordo com a ordem de referência
    const tamanhosOrdenados = tamanhosArray
      .map(t => t.trim().toUpperCase()) 
      .filter(t => TAMANHOS_ORDEM.includes(t)) 
      .sort((a, b) => TAMANHOS_ORDEM.indexOf(a) - TAMANHOS_ORDEM.indexOf(b));

    // 3. Junta com espaço após a vírgula: "P, M, G, GG"
    return tamanhosOrdenados.join(', ');
  }

  editarProduto(id: string | number) {
    this.router.navigate(['roupas/cadastro', id]);
  }
  
  cadastrarProduto() {
    this.router.navigate(['roupas/cadastro']);
  }

  excluirProduto(id: number) {
    if (confirm('Tem certeza que deseja excluir o produto com ID: ' + id + '?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.listaProdutos = this.listaProdutos.filter(p => p.id !== id);
        },
        error: (err) => console.error('Erro ao excluir:', err)
      });
    }
  }
}