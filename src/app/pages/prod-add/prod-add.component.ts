import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutosService } from '../../core/services/produtos.service';
import { Produtos, Marca } from '../../core/types/types';

type ProdutoParaFormulario = Omit<Produtos, 'id' | 'tamanho' | 'cor'> & {
  id?: String | number;
  tamanho: string[]; 
  cor: string[];   
  imagem: string;
};

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
    cor: [], 
    tamanho: [],
    marca: '',
    valor: 0,
    categoria: '',
    imagem: ''
  };

  marcasDisponiveis: string[] = [];
  coresCadastradas: string[] = []; 

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
            
            this.produto = {
              ...prod,
              tamanho: Array.isArray(prod.tamanho) ? prod.tamanho : (prod.tamanho ? (prod.tamanho as string).split(',') : []),
              cor: Array.isArray(prod.cor) ? prod.cor : (prod.cor ? (prod.cor as string).split(',') : []),
              imagem: (prod as any).imagem || ''
            };

            this.produto.cor.forEach(c => {
              if (c && !this.coresCadastradas.includes(c)) {
                this.coresCadastradas.push(c);
              }
            });

            this.formatarValor(this.produto.valor);

            this.uploadArea = document.getElementById("upload-area") as HTMLElement;
            this.updateImagePreview(this.produto.imagem);
          }
        });
      } else {
        this.formatarValor(this.produto.valor);
      }
    });
  }

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

  toggleCor(corValor: string) {
    const index = this.produto.cor.indexOf(corValor);
    if (index > -1) {
      this.produto.cor.splice(index, 1);
    } else {
      this.produto.cor.push(corValor);
    }
  }

  removerCor(corValor: string) {
    if (!confirm(`Tem certeza que deseja remover a cor ${corValor} da lista de cores disponíveis?`)) {
      return;
    }

    const cadastradasIndex = this.coresCadastradas.indexOf(corValor);
    if (cadastradasIndex > -1) {
      this.coresCadastradas.splice(cadastradasIndex, 1);
    }

    const produtoIndex = this.produto.cor.indexOf(corValor);
    if (produtoIndex > -1) {
      this.produto.cor.splice(produtoIndex, 1);
    }
  }

  adicionarNovaCor(event: Event) {
    const input = event.target as HTMLInputElement;
    const novaCor = input.value.toUpperCase();
    if (novaCor && !this.coresCadastradas.includes(novaCor)) {
      this.coresCadastradas.push(novaCor);
      this.toggleCor(novaCor);
    }
    input.value = '#000000';
  }

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

      if (this.marcasDisponiveis.includes(nomeMarca)) {
        alert(`A marca ${nomeMarca} já está cadastrada.`);
        this.produto.marca = nomeMarca;
        return;
      }

      this.service.inserirMarca({ nome: nomeMarca }).subscribe({
        next: (marcaInserida) => {
          this.marcasDisponiveis.push(marcaInserida.nome);
          this.produto.marca = marcaInserida.nome; 
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
    const produtoParaAPI = {
      ...this.produto,
      tamanho: this.produto.tamanho.join(','),
      cor: this.produto.cor.join(','), 
      id: this.produto.id && this.produto.id !== 0 ? this.produto.id : undefined
    } as unknown as Produtos & { imagem: string };

    const { id, ...produtoParaInserir } = produtoParaAPI;

    if (this.produto.id && this.produto.id !== 0) {
      this.service.atualizar(produtoParaAPI).subscribe({
        next: () => this.redireciona(),
        error: (err) => console.error('Erro ao editar:', err)
      });
    } else {
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