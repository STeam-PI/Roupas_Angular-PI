import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutosService } from '../../core/services/produtos.service';
import { Produtos, Marca } from '../../core/types/types';

// Tipo auxiliar para permitir que o 'id' seja opcional ou 0
type ProdutoParaFormulario = Omit<Produtos, 'id' | 'tamanho' | 'cor'> & {
  id?: String | number;
  tamanho: string[]; // Array de tamanhos selecionados
  cor: string[];     // Alterado para array de strings para seleção múltipla de cores
  imagem: string;
};

// Tipagem simplificada de Tamanho
type TamanhoOpcao = { valor: string, label: string };

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
    cor: [], // Inicializado como array vazio
    tamanho: [],
    marca: '',
    valor: 0,
    imagem: ''
  };

  marcasDisponiveis: string[] = [];
  coresCadastradas: string[] = []; // Inicia vazio. Cores serão adicionadas pelo usuário.

  tamanhosOpcoes: TamanhoOpcao[] = [
    { valor: 'P', label: 'P' },
    { valor: 'M', label: 'M' },
    { valor: 'G', label: 'G' },
    { valor: 'GG', label: 'GG' },
  ];

  valorFormatado: string = '0,00';
  private uploadArea: HTMLElement | null = null;
  private inputImg: HTMLInputElement | null = null;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ProdutosService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.service.listarMarcas().subscribe(marcas => {
      this.marcasDisponiveis = marcas.map(m => m.nome);

      if (idParam) {
        this.service.buscarPorId(idParam).subscribe(prod => {
          if (prod) {
            // Lógica para carregar tamanhos e cores corretamente
            this.produto = {
              ...prod,
              tamanho: Array.isArray(prod.tamanho) ? prod.tamanho : (prod.tamanho ? (prod.tamanho as string).split(',') : []),
              // Converte a string de cores salva ('#000000,#FFFFFF') em array
              cor: Array.isArray(prod.cor) ? prod.cor : (prod.cor ? (prod.cor as string).split(',') : []),
              imagem: (prod as any).imagem || ''
            };

            // Adiciona as cores do produto à lista de cores disponíveis (se não existirem)
            this.produto.cor.forEach(c => {
              if (c && !this.coresCadastradas.includes(c)) {
                this.coresCadastradas.push(c);
              }
            });

            this.formatarValor(this.produto.valor);

            // ** REQUISITO: Chamar a atualização do preview da imagem aqui **
            this.uploadArea = document.getElementById("upload-area") as HTMLElement;
            this.updateImagePreview(this.produto.imagem);
          }
        });
      } else {
        this.formatarValor(this.produto.valor);
      }
    });
  }

  // ** REQUISITO: Método para centralizar a lógica de preview da imagem **
  updateImagePreview(base64Image: string) {
    if (!this.uploadArea) return;

    if (base64Image) {
      this.uploadArea.style.backgroundImage = `url('${base64Image}')`;
      this.uploadArea.classList.add("has-image");
    } else {
      this.uploadArea.style.backgroundImage = 'none';
      this.uploadArea.classList.remove("has-image");
    }
  }

  ngAfterViewInit(): void {
    this.inputImg = document.getElementById("item-image") as HTMLInputElement;
    this.uploadArea = document.getElementById("upload-area") as HTMLElement;

    // Lógica de Upload de Imagem e Conversão para Base64
    this.inputImg?.addEventListener("change", () => {
      const file = this.inputImg?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          const base64Image = e.target?.result as string;
          this.produto.imagem = base64Image;
          // Chamar o método centralizado
          this.updateImagePreview(base64Image);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Lógica para toggle de seleção de cores (múltipla seleção)
  toggleCor(corValor: string) {
    const index = this.produto.cor.indexOf(corValor);
    if (index > -1) {
      // Remove da seleção do produto
      this.produto.cor.splice(index, 1);
    } else {
      // Adiciona à seleção do produto
      this.produto.cor.push(corValor);
    }
  }

  // ** REQUISITO: Lógica de remoção de cor **
  removerCor(corValor: string) {
    if (!confirm(`Tem certeza que deseja remover a cor ${corValor} da lista de cores disponíveis?`)) {
      return;
    }

    // 1. Remove da lista de cores disponíveis (coresCadastradas)
    const cadastradasIndex = this.coresCadastradas.indexOf(corValor);
    if (cadastradasIndex > -1) {
      this.coresCadastradas.splice(cadastradasIndex, 1);
    }

    // 2. Remove da seleção atual do produto (produto.cor)
    const produtoIndex = this.produto.cor.indexOf(corValor);
    if (produtoIndex > -1) {
      this.produto.cor.splice(produtoIndex, 1);
    }
  }

  // Requisito: Adicionar nova cor
  adicionarNovaCor(event: Event) {
    const input = event.target as HTMLInputElement;
    const novaCor = input.value.toUpperCase();
    if (novaCor && !this.coresCadastradas.includes(novaCor)) {
      this.coresCadastradas.push(novaCor);
      // Seleciona a cor recém-cadastrada (adiciona à seleção do produto)
      this.toggleCor(novaCor);
    }
    input.value = '#000000'; // Reseta o input de cor
  }

  // ... (Outros métodos - toggleTamanho, cadastrarNovaMarca, formatarValor, salvar, redireciona - mantidos) ...
  toggleTamanho(tamanhoValor: string) {
    const index = this.produto.tamanho.indexOf(tamanhoValor);
    if (index > -1) {
      this.produto.tamanho.splice(index, 1);
    } else {
      this.produto.tamanho.push(tamanhoValor);
    }
  }

  cadastrarNovaMarca() {
    const novaMarcaNome = prompt("Digite o nome da nova marca:");
    if (novaMarcaNome && novaMarcaNome.trim() !== '') {
      const nomeMarca = novaMarcaNome.trim();

      // Verifica se já existe na lista atual
      if (this.marcasDisponiveis.includes(nomeMarca)) {
        alert(`A marca ${nomeMarca} já está cadastrada.`);
        this.produto.marca = nomeMarca;
        return;
      }

      // Insere na API e atualiza a lista
      this.service.inserirMarca({ nome: nomeMarca }).subscribe({
        next: (marcaInserida) => {
          this.marcasDisponiveis.push(marcaInserida.nome);
          this.produto.marca = marcaInserida.nome; // Seleciona a nova marca
          alert(`Marca ${marcaInserida.nome} cadastrada com sucesso!`);
        },
        error: (err) => console.error('Erro ao cadastrar marca:', err)
      });
    }
  }

  aplicarMascaraValor() {
    const valorLimpo = this.valorFormatado.replace(/\D/g, '');
    let valorEmCentavos = parseInt(valorLimpo, 10);
    if (isNaN(valorEmCentavos)) valorEmCentavos = 0;
    this.produto.valor = valorEmCentavos / 100;
    this.valorFormatado = this.produto.valor.toFixed(2).replace('.', ',');
  }

  formatarValor(valor: number) {
    this.produto.valor = valor;
    this.valorFormatado = valor.toFixed(2).replace('.', ',');
  }


  salvar() {
    // REQUISITO: Persistir cores e tamanhos como string separada por vírgula para o json-server
    const produtoParaAPI = {
      ...this.produto,
      tamanho: this.produto.tamanho.join(','),
      cor: this.produto.cor.join(','), // Converte array de cores para string
      id: this.produto.id && this.produto.id !== 0 ? this.produto.id : undefined
    } as unknown as Produtos & { imagem: string };

    const { id, ...produtoParaInserir } = produtoParaAPI;

    if (this.produto.id && this.produto.id !== 0) {
      // Lógica PUT (Edição)
      this.service.atualizar(produtoParaAPI).subscribe({
        next: () => this.redireciona(),
        error: (err) => console.error('Erro ao editar:', err)
      });
    } else {
      // Lógica POST (Criação)
      this.service.inserir(produtoParaInserir as unknown as Produtos).subscribe({
        next: () => this.redireciona(),
        error: (err) => console.error('Erro ao cadastrar:', err)
      });
    }
  }

  redireciona() {
    this.router.navigate(['roupas/listagem']);
  }
}