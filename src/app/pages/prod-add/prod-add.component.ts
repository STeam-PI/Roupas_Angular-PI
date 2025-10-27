import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutosService } from '../../core/services/produtos.service';
import { Produtos } from '../../core/types/types'; // Assumindo que 'Produtos' está aqui

// Tipo auxiliar para permitir que o 'id' seja opcional ou 0
type ProdutoParaFormulario = Omit<Produtos, 'id'> & { id?: String | number; };
// Tipagem para opções de Tamanho
type TamanhoOpcao = { valor: string, label: string, tipo: 'roupa' | 'calcado' };

@Component({
  selector: 'app-prod-add',
  imports: [CommonModule, FormsModule], 
  standalone: true,
  templateUrl: './prod-add.component.html',
  styleUrl: './prod-add.component.css'
})
export class ProdAddComponent implements OnInit, AfterViewInit {
  produto: ProdutoParaFormulario = {
    id: 0, 
    nome: '',
    cor: '', // Armazena a cor hexadecimal selecionada
    tamanho: '', // Armazena o tamanho selecionado (P, M, G ou 36, 37, 38...)
    marca: '',
    valor: 0,
  };
  
  // Listas Dinâmicas (Simuladas - idealmente viriam de um service)
  marcasDisponiveis: string[] = ['Nike', 'Adidas', 'Puma', 'Levis', 'Approve', 'Gap'];
  coresCadastradas: string[] = ['#000000', '#FFD700', '#FFFFFF']; 
  
  tamanhosOpcoes: TamanhoOpcao[] = [
    { valor: 'P', label: 'P', tipo: 'roupa' },
    { valor: 'M', label: 'M', tipo: 'roupa' },
    { valor: 'G', label: 'G', tipo: 'roupa' },
    { valor: 'GG', label: 'GG', tipo: 'roupa' },
    { valor: '36', label: '36', tipo: 'calcado' },
    { valor: '37', label: '37', tipo: 'calcado' },
    { valor: '38', label: '38', tipo: 'calcado' },
    { valor: '39', label: '39', tipo: 'calcado' },
    { valor: '40', label: '40', tipo: 'calcado' },
  ];
  
  // Variável de controle para alternar entre "roupa" e "calçado"
  tipoTamanhoSelecionado: 'roupa' | 'calcado' = 'roupa';

  // Getter para facilitar a filtragem no template (substitui o pipe)
  get tamanhosFiltrados(): TamanhoOpcao[] {
    return this.tamanhosOpcoes.filter(t => t.tipo === this.tipoTamanhoSelecionado);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ProdutosService
  ) { }

  ngOnInit(): void {
    // Tenta obter o parâmetro 'id' da rota
    const idParam = this.route.snapshot.paramMap.get('id');

    // Verifica se temos um ID válido para a Edição
    if (idParam) {
      // Se for edição, busca os dados do produto.
      this.service.buscarPorId(idParam).subscribe(prod => {
        if (prod) {
          // Atribui os dados do produto retornado
          this.produto = prod; 
          // ... Lógica para determinar o tipo de tamanho (mantida) ...
          const tamanhoCarregado = this.tamanhosOpcoes.find(t => t.valor === prod.tamanho);
          if (tamanhoCarregado) {
            this.tipoTamanhoSelecionado = tamanhoCarregado.tipo;
          }
        }
      });
    } else {
      
    }
  }

  ngAfterViewInit(): void {
    // 1. Lógica de Upload de Imagem (mantida)
    const inputImg = document.getElementById("item-image") as HTMLInputElement;
    const uploadArea = document.getElementById("upload-area") as HTMLElement;

    inputImg?.addEventListener("change", () => {
      const file = inputImg.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          const imageUrl = e.target?.result as string;

          uploadArea.style.backgroundImage = `url('${imageUrl}')`;
          uploadArea.classList.add("has-image");
        };
        reader.readAsDataURL(file);
      }
    });

    // 2. Lógica de Seleção de Tamanhos (via JS Puro) REMOVIDA
    // A classe 'active' para os tamanhos será agora gerenciada via Angular no HTML
    // usando [class.active]="produto.tamanho === tamanho.valor".
  }
  
  // Requisito: Adicionar nova cor
  adicionarNovaCor(event: Event) {
    const input = event.target as HTMLInputElement;
    const novaCor = input.value.toUpperCase();
    if (novaCor && !this.coresCadastradas.includes(novaCor)) {
      this.coresCadastradas.push(novaCor);
      this.produto.cor = novaCor; // Seleciona a cor recém-cadastrada
    }
    input.value = '#000000'; // Reseta o input de cor
  }

  // Requisito: Cadastrar nova marca
  cadastrarNovaMarca() {
    const novaMarca = prompt("Digite o nome da nova marca:");
    if (novaMarca && novaMarca.trim() !== '' && !this.marcasDisponiveis.includes(novaMarca.trim())) {
      this.marcasDisponiveis.push(novaMarca.trim());
      this.produto.marca = novaMarca.trim(); // Seleciona a nova marca
    }
  }

  // Requisito: Alternar Tipo de Tamanho
  alternarTipoTamanho(tipo: 'roupa' | 'calcado') {
    this.tipoTamanhoSelecionado = tipo;
    this.produto.tamanho = ''; // Limpa o tamanho ao alternar o tipo
  }

  salvar() {
    if (this.produto.id && this.produto.id !== 0) {
      // Lógica PUT (Edição)
      this.service.atualizar(this.produto as Produtos).subscribe({
        next: () => this.redireciona(),
        error: (err) => console.error('Erro ao editar:', err)
      });
    } else {
      // Lógica POST (Criação)
      const { id, ...produtoParaInserir } = this.produto; 
      this.service.inserir(produtoParaInserir as Produtos).subscribe({
        next: () => this.redireciona(),
        error: (err) => console.error('Erro ao cadastrar:', err)
      });
    }
  }

  redireciona() {
    this.router.navigate(['roupas/listagem']);
  }
}