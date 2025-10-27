import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common'; // Incluir CommonModule/DecimalPipe se não estiver
import { ProdutosService } from '../../core/services/produtos.service';
import { Produtos } from '../../core/types/types';

@Component({
  selector: 'app-prod-cadastro',
  // Se for standalone, mantenha os imports
  imports: [CommonModule, DecimalPipe],
  standalone: true, // Se for standalone
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
    // Lógica GET para carregar lista
    this.service.listar().subscribe((produtos) => {
      this.listaProdutos = produtos;
    });
  }

  // NOVO/CORRIGIDO: Método para navegar para a rota de edição com o ID
  editarProduto(id: string | number) {
    // Redireciona para /roupas/cadastro/ID_DO_PRODUTO
    this.router.navigate(['roupas/cadastro', id]);
  }
  
  // Se você ainda tiver o método cadastrarProduto(), ele deve ser assim:
  cadastrarProduto() {
    this.router.navigate(['roupas/cadastro']);
  }

  excluirProduto(id: number) {
    if (confirm('Tem certeza que deseja excluir o produto com ID: ' + id + '?')) {
      this.service.excluir(id).subscribe({ //
        next: () => {
          // MELHORIA: Atualiza a lista localmente (melhor que window.location.reload())
          this.listaProdutos = this.listaProdutos.filter(p => p.id !== id);
        },
        error: (err) => console.error('Erro ao excluir:', err)
      });
    }
  };
}