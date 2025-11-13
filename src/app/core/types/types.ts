export interface Produtos {
  id: number;
  nome: string;
  cor: string[]; 
  tamanho: string | string[]; 
  marca: string;
  valor: number;
  categoria: string;
  imagem: string; 
}

export interface Marca {
    id?: number;
    nome: string;
}

export interface Categoria {
    id?: number;
    nome: string;
}